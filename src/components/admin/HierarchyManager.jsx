import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Plus } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { toast } from 'sonner';

/**
 * Generic CRUD component for managing hierarchical entities
 * (Years, Semesters, Subjects, Units, Topics)
 */
const HierarchyManager = ({
  title,
  description,
  parentTitle,
  parentItems,
  items,
  loading,
  onLoadParents,
  onLoadItems,
  onAdd,
  onUpdate,
  onDelete,
  fields = ['name', 'description'], // Default fields to show
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedParent, setSelectedParent] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (onLoadParents) onLoadParents();
  }, []);

  useEffect(() => {
    if (selectedParent && onLoadItems) {
      onLoadItems(selectedParent);
    }
  }, [selectedParent]);

  const resetForm = () => {
    const emptyForm = {};
    fields.forEach(field => {
      emptyForm[field] = '';
    });
    setFormData(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData };
      if (parentTitle) {
        dataToSubmit.parentId = selectedParent;
      }

      if (editingItem) {
        await onUpdate(editingItem._id, dataToSubmit);
        toast.success('Updated successfully');
      } else {
        await onAdd(dataToSubmit);
        toast.success('Added successfully');
      }
      
      setDialogOpen(false);
      resetForm();
      setEditingItem(null);
      if (onLoadItems && selectedParent) {
        onLoadItems(selectedParent);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const editForm = {};
    fields.forEach(field => {
      editForm[field] = item[field] || '';
    });
    setFormData(editForm);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await onDelete(id);
      toast.success('Deleted successfully');
      if (onLoadItems && selectedParent) {
        onLoadItems(selectedParent);
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      {/* Parent Selector */}
      {parentTitle && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Label>{parentTitle}</Label>
            <Select value={selectedParent} onValueChange={setSelectedParent}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${parentTitle.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {parentItems.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {(!parentTitle || selectedParent) && (
        <>
          <div className="mb-4 flex justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingItem(null); resetForm(); }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit' : 'Add New'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {fields.map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                        {field === 'name' && ' *'}
                      </Label>
                      {field === 'description' ? (
                        <Textarea
                          id={field}
                          value={formData[field] || ''}
                          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                          placeholder={`Enter ${field}`}
                        />
                      ) : (
                        <Input
                          id={field}
                          value={formData[field] || ''}
                          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                          placeholder={`Enter ${field}`}
                          required={field === 'name'}
                        />
                      )}
                    </div>
                  ))}
                  <Button type="submit" className="w-full">
                    {editingItem ? 'Update' : 'Add'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card key={item._id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <div className="text-lg">{item.name}</div>
                        {item.code && (
                          <div className="text-sm font-normal text-muted-foreground">{item.code}</div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  {item.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HierarchyManager;
