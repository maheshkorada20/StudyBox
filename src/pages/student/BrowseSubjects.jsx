import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const BrowseSubjects = () => {
  const { semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, [semesterId]);

  const loadSubjects = async () => {
    try {
      const response = await studentAPI.getSubjects(semesterId);
      setSubjects(response.data);
    } catch (error) {
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Subjects</h1>
          <p className="mt-2 text-muted-foreground">Select a subject to view units and topics</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Card key={subject._id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      {subject.code && (
                        <p className="text-sm text-muted-foreground">{subject.code}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {subject.description && (
                    <p className="mb-4 text-sm text-muted-foreground">{subject.description}</p>
                  )}
                  <Button asChild className="w-full">
                    <Link to={`/student/subject/${subject._id}/units`}>
                      View Units
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseSubjects;
