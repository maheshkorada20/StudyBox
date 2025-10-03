import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadBranches();
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/student/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Browse and access your study materials
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for resources, topics, subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        {/* Branches */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Browse by Branch</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <Card key={branch._id} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle>{branch.name}</CardTitle>
                        <CardDescription>{branch.code}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {branch.description && (
                      <p className="mb-4 text-sm text-muted-foreground">
                        {branch.description}
                      </p>
                    )}
                    <Button asChild className="w-full">
                      <Link to={`/student/branch/${branch._id}`}>
                        Explore Branch
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
