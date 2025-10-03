import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderTree, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const BrowseUnits = () => {
  const { subjectId } = useParams();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUnits();
  }, [subjectId]);

  const loadUnits = async () => {
    try {
      const response = await studentAPI.getUnits(subjectId);
      setUnits(response.data);
    } catch (error) {
      toast.error('Failed to load units');
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
          <h1 className="text-3xl font-bold text-foreground">Units</h1>
          <p className="mt-2 text-muted-foreground">Select a unit to view topics</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <Card key={unit._id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <FolderTree className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{unit.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {unit.description && (
                    <p className="mb-4 text-sm text-muted-foreground">{unit.description}</p>
                  )}
                  <Button asChild className="w-full">
                    <Link to={`/student/unit/${unit._id}/topics`}>
                      View Topics
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

export default BrowseUnits;
