import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { adminAPI } from '@/api/admin';
import { toast } from 'sonner';

const AdminBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '' });

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const response = await adminAPI.getBranches();
      setBranches(response.data);
    } catch (error) {
      toast.error('Failed to load branches');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBranch) {
        await adminAPI.updateBranch(editingBranch._id, formData);
        toast.success('Branch updated successfully');
      } else {
        await adminAPI.addBranch(formData);
        toast.success('Branch added successfully');
      }
      setDialogOpen(false);
      setFormData({ name: '', code: '', description: '' });
      setEditingBranch(null);
      loadBranches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({ name: branch.name, code: branch.code, description: branch.description || '' });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this branch?')) return;
    try {
      await adminAPI.deleteBranch(id);
      toast.success('Branch deleted successfully');
      loadBranches();
    } catch (error) {
      toast.error('Failed to delete branch');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Branches</h1>
            <p className="mt-2 text-muted-foreground">Add and manage academic branches</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingBranch(null); setFormData({ name: '', code: '', description: '' }); }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Branch Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Branch Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., CSE"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingBranch ? 'Update Branch' : 'Add Branch'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <Card key={branch._id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <div className="text-lg">{branch.name}</div>
                      <div className="text-sm font-normal text-muted-foreground">{branch.code}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(branch)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(branch._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                {branch.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{branch.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBranches;
