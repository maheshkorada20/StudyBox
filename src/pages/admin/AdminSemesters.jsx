import { useState } from 'react';
import Header from '@/components/layout/Header';
import HierarchyManager from '@/components/admin/HierarchyManager';
import { adminAPI } from '@/api/admin';
import { studentAPI } from '@/api/student';

const AdminSemesters = () => {
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadYears = async () => {
    // This is a workaround - ideally we'd have an endpoint to get all years
    // For now, you might need to select a branch first or load from all branches
    const branchesRes = await studentAPI.getBranches();
    if (branchesRes.data.length > 0) {
      const yearsRes = await studentAPI.getYears(branchesRes.data[0]._id);
      setYears(yearsRes.data);
    }
  };

  const loadSemesters = async (yearId) => {
    setLoading(true);
    try {
      const response = await adminAPI.getSemesters(yearId);
      setSemesters(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HierarchyManager
          title="Manage Semesters"
          description="Add and manage semesters"
          parentTitle="Year"
          parentItems={years}
          items={semesters}
          loading={loading}
          onLoadParents={loadYears}
          onLoadItems={loadSemesters}
          onAdd={adminAPI.addSemester}
          onUpdate={adminAPI.updateSemester}
          onDelete={adminAPI.deleteSemester}
          fields={['name', 'description']}
        />
      </main>
    </div>
  );
};

export default AdminSemesters;
