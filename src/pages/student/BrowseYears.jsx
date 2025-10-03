import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const BrowseYears = () => {
  const { branchId } = useParams();
  const [years, setYears] = useState([]);
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [branchId]);

  const loadData = async () => {
    try {
      const [yearsRes, branchesRes] = await Promise.all([
        studentAPI.getYears(branchId),
        studentAPI.getBranches()
      ]);
      setYears(yearsRes.data);
      setBranch(branchesRes.data.find(b => b._id === branchId));
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/student/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{branch?.name || 'Branch'}</h1>
          <p className="mt-2 text-muted-foreground">Select your academic year</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {years.map((year) => (
              <Card key={year._id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{year.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={`/student/year/${year._id}/semesters`}>
                      View Semesters
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

export default BrowseYears;
