import { useState } from 'react';
import Header from '@/components/layout/Header';
import HierarchyManager from '@/components/admin/HierarchyManager';
import { adminAPI } from '@/api/admin';
import { studentAPI } from '@/api/student';

const AdminTopics = () => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSubjects = async () => {
    const branchesRes = await studentAPI.getBranches();
    if (branchesRes.data.length > 0) {
      const yearsRes = await studentAPI.getYears(branchesRes.data[0]._id);
      if (yearsRes.data.length > 0) {
        const semestersRes = await studentAPI.getSemesters(yearsRes.data[0]._id);
        if (semestersRes.data.length > 0) {
          const subjectsRes = await studentAPI.getSubjects(semestersRes.data[0]._id);
          setSubjects(subjectsRes.data);
        }
      }
    }
  };

  const loadTopics = async (subjectId) => {
    setLoading(true);
    try {
      const response = await adminAPI.getTopics(subjectId);
      setTopics(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HierarchyManager
          title="Manage Topics"
          description="Add and manage topics"
          parentTitle="Subject"
          parentItems={subjects}
          items={topics}
          loading={loading}
          onLoadParents={loadSubjects}
          onLoadItems={loadTopics}
          onAdd={adminAPI.addTopic}
          onUpdate={adminAPI.updateTopic}
          onDelete={adminAPI.deleteTopic}
          fields={['name', 'description']}
        />
      </main>
    </div>
  );
};

export default AdminTopics;
