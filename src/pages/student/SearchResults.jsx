import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Video, Search, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await studentAPI.searchResources(query);
      setResults(response.data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
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
          <h1 className="mb-4 text-3xl font-bold text-foreground">Search Resources</h1>
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
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : results.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                {searchQuery ? 'No results found' : 'Enter a search query to find resources'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchParams.get('q')}"
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((resource) => (
                <Card key={resource._id} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-2">
                      {resource.type === 'pdf' ? (
                        <FileText className="mt-1 h-5 w-5 text-primary" />
                      ) : (
                        <Video className="mt-1 h-5 w-5 text-primary" />
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {resource.difficulty} • {resource.views || 0} views
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {resource.summary && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{resource.summary}</p>
                    )}
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to={`/student/resource/${resource._id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
