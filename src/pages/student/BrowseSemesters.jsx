import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookMarked, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const BrowseSemesters = () => {
  const { yearId } = useParams();
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSemesters();
  }, [yearId]);

  const loadSemesters = async () => {
    try {
      const response = await studentAPI.getSemesters(yearId);
      setSemesters(response.data);
    } catch (error) {
      toast.error('Failed to load semesters');
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
          <h1 className="text-3xl font-bold text-foreground">Semesters</h1>
          <p className="mt-2 text-muted-foreground">Select a semester</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {semesters.map((semester) => (
              <Card key={semester._id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <BookMarked className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{semester.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={`/student/semester/${semester._id}/subjects`}>
                      View Subjects
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

export default BrowseSemesters;
