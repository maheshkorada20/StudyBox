import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Plus, FileText, Video } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { adminAPI } from '@/api/admin';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const AdminResources = () => {
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [formData, setFormData] = useState({
    topicId: '',
    title: '',
    type: 'pdf',
    summary: '',
    youtubeLinks: '',
    tags: '',
    difficulty: 'medium',
  });
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    loadBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) loadYears(selectedBranch);
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedYear) loadSemesters(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    if (selectedSemester) loadSubjects(selectedSemester);
  }, [selectedSemester]);

  useEffect(() => {
    if (selectedSubject) loadUnits(selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedUnit) loadTopics(selectedUnit);
  }, [selectedUnit]);

  useEffect(() => {
    if (selectedTopic) loadResources(selectedTopic);
  }, [selectedTopic]);

  const loadBranches = async () => {
    try {
      const response = await studentAPI.getBranches();
      setBranches(response.data);
    } catch (error) {
      toast.error('Failed to load branches');
    } finally {
      setLoading(false);
    }
  };

  const loadYears = async (branchId) => {
    try {
      const response = await studentAPI.getYears(branchId);
      setYears(response.data);
    } catch (error) {
      toast.error('Failed to load years');
    }
  };

  const loadSemesters = async (yearId) => {
    try {
      const response = await studentAPI.getSemesters(yearId);
      setSemesters(response.data);
    } catch (error) {
      toast.error('Failed to load semesters');
    }
  };

  const loadSubjects = async (semesterId) => {
    try {
      const response = await studentAPI.getSubjects(semesterId);
      setSubjects(response.data);
    } catch (error) {
      toast.error('Failed to load subjects');
    }
  };

  const loadUnits = async (subjectId) => {
    try {
      const response = await studentAPI.getUnits(subjectId);
      setUnits(response.data);
    } catch (error) {
      toast.error('Failed to load units');
    }
  };

  const loadTopics = async (unitId) => {
    try {
      const response = await studentAPI.getTopics(unitId);
      setTopics(response.data);
    } catch (error) {
      toast.error('Failed to load topics');
    }
  };

  const loadResources = async (topicId) => {
    try {
      const response = await adminAPI.getResources(topicId);
      setResources(response.data);
    } catch (error) {
      toast.error('Failed to load resources');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('topicId', selectedTopic);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('summary', formData.summary);
      formDataToSend.append('youtubeLinks', formData.youtubeLinks);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('difficulty', formData.difficulty);
      
      if (pdfFile) {
        formDataToSend.append('pdf', pdfFile);
      }

      if (editingResource) {
        await adminAPI.updateResource(editingResource._id, formDataToSend);
        toast.success('Resource updated successfully');
      } else {
        await adminAPI.addResource(formDataToSend);
        toast.success('Resource added successfully');
      }
      
      setDialogOpen(false);
      resetForm();
      loadResources(selectedTopic);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      topicId: '',
      title: '',
      type: 'pdf',
      summary: '',
      youtubeLinks: '',
      tags: '',
      difficulty: 'medium',
    });
    setPdfFile(null);
    setEditingResource(null);
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      topicId: resource.topicId,
      title: resource.title,
      type: resource.type,
      summary: resource.summary || '',
      youtubeLinks: resource.youtubeLinks?.join(', ') || '',
      tags: resource.tags?.join(', ') || '',
      difficulty: resource.difficulty || 'medium',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    try {
      await adminAPI.deleteResource(id);
      toast.success('Resource deleted successfully');
      loadResources(selectedTopic);
    } catch (error) {
      toast.error('Failed to delete resource');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Manage Resources</h1>
          <p className="mt-2 text-muted-foreground">Upload and manage educational resources</p>
        </div>

        {/* Hierarchy Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Branch</Label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch._id} value={branch._id}>{branch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedBranch && (
                <div>
                  <Label>Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year._id} value={year._id}>{year.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedYear && (
                <div>
                  <Label>Semester</Label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((sem) => (
                        <SelectItem key={sem._id} value={sem._id}>{sem.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedSemester && (
                <div>
                  <Label>Subject</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((sub) => (
                        <SelectItem key={sub._id} value={sub._id}>{sub.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedSubject && (
                <div>
                  <Label>Unit</Label>
                  <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit._id} value={unit._id}>{unit.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedUnit && (
                <div>
                  <Label>Topic</Label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic._id} value={topic._id}>{topic.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedTopic && (
          <>
            <div className="mb-4 flex justify-end">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Resource title"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type *</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pdf">Upload PDF</Label>
                      <Input
                        id="pdf"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setPdfFile(e.target.files[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Brief summary of the resource"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="youtubeLinks">YouTube Links (comma-separated)</Label>
                      <Input
                        id="youtubeLinks"
                        value={formData.youtubeLinks}
                        onChange={(e) => setFormData({ ...formData, youtubeLinks: e.target.value })}
                        placeholder="https://youtube.com/..., https://youtube.com/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="algorithms, data structures, programming"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      {editingResource ? 'Update Resource' : 'Add Resource'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Card key={resource._id}>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        {resource.type === 'pdf' ? (
                          <FileText className="mt-1 h-5 w-5 text-primary" />
                        ) : (
                          <Video className="mt-1 h-5 w-5 text-primary" />
                        )}
                        <div className="flex-1">
                          <div className="text-base">{resource.title}</div>
                          <div className="mt-1 text-xs font-normal text-muted-foreground">
                            {resource.difficulty}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(resource)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(resource._id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  {resource.summary && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{resource.summary}</p>
                      {resource.tags && resource.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {resource.tags.map((tag, idx) => (
                            <span key={idx} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminResources;
