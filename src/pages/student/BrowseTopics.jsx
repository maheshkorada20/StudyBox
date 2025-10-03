import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListTree, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const BrowseTopics = () => {
  const { unitId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, [unitId]);

  const loadTopics = async () => {
    try {
      const response = await studentAPI.getTopics(unitId);
      setTopics(response.data);
    } catch (error) {
      toast.error('Failed to load topics');
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
          <h1 className="text-3xl font-bold text-foreground">Topics</h1>
          <p className="mt-2 text-muted-foreground">Select a topic to view resources</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Card key={topic._id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <ListTree className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{topic.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {topic.description && (
                    <p className="mb-4 text-sm text-muted-foreground">{topic.description}</p>
                  )}
                  <Button asChild className="w-full">
                    <Link to={`/student/topic/${topic._id}/resources`}>
                      View Resources
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

export default BrowseTopics;
