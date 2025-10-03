import { useState } from 'react';
import Header from '@/components/layout/Header';
import HierarchyManager from '@/components/admin/HierarchyManager';
import { adminAPI } from '@/api/admin';
import { studentAPI } from '@/api/student';

const AdminSubjects = () => {
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSemesters = async () => {
    // Load from first year - adjust based on your needs
    const branchesRes = await studentAPI.getBranches();
    if (branchesRes.data.length > 0) {
      const yearsRes = await studentAPI.getYears(branchesRes.data[0]._id);
      if (yearsRes.data.length > 0) {
        const semestersRes = await studentAPI.getSemesters(yearsRes.data[0]._id);
        setSemesters(semestersRes.data);
      }
    }
  };

  const loadSubjects = async (semesterId) => {
    setLoading(true);
    try {
      const response = await adminAPI.getSubjects(semesterId);
      setSubjects(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HierarchyManager
          title="Manage Subjects"
          description="Add and manage subjects"
          parentTitle="Semester"
          parentItems={semesters}
          items={subjects}
          loading={loading}
          onLoadParents={loadSemesters}
          onLoadItems={loadSubjects}
          onAdd={adminAPI.addSubject}
          onUpdate={adminAPI.updateSubject}
          onDelete={adminAPI.deleteSubject}
          fields={['name', 'code', 'description']}
        />
      </main>
    </div>
  );
};

export default AdminSubjects;
