import { useState } from 'react';
import Header from '@/components/layout/Header';
import HierarchyManager from '@/components/admin/HierarchyManager';
import { adminAPI } from '@/api/admin';
import { studentAPI } from '@/api/student';

const AdminYears = () => {
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBranches = async () => {
    const response = await studentAPI.getBranches();
    setBranches(response.data);
  };

  const loadYears = async (branchId) => {
    setLoading(true);
    try {
      const response = await adminAPI.getYears(branchId);
      setYears(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HierarchyManager
          title="Manage Years"
          description="Add and manage academic years"
          parentTitle="Branch"
          parentItems={branches}
          items={years}
          loading={loading}
          onLoadParents={loadBranches}
          onLoadItems={loadYears}
          onAdd={adminAPI.addYear}
          onUpdate={adminAPI.updateYear}
          onDelete={adminAPI.deleteYear}
          fields={['name', 'description']}
        />
      </main>
    </div>
  );
};

export default AdminYears;
