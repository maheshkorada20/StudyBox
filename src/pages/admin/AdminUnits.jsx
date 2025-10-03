import { useState } from 'react';
import Header from '@/components/layout/Header';
import HierarchyManager from '@/components/admin/HierarchyManager';
import { adminAPI } from '@/api/admin';
import { studentAPI } from '@/api/student';

const AdminUnits = () => {
  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSubjects = async () => {
    // Load from first semester
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

  const loadUnits = async (subjectId) => {
    setLoading(true);
    try {
      const response = await adminAPI.getUnits(subjectId);
      setUnits(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HierarchyManager
          title="Manage Units"
          description="Add and manage units"
          parentTitle="Subject"
          parentItems={subjects}
          items={units}
          loading={loading}
          onLoadParents={loadSubjects}
          onLoadItems={loadUnits}
          onAdd={adminAPI.addUnit}
          onUpdate={adminAPI.updateUnit}
          onDelete={adminAPI.deleteUnit}
          fields={['name', 'description']}
        />
      </main>
    </div>
  );
};

export default AdminUnits;
