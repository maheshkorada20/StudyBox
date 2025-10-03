import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, Download, Copy, Heart, Star, Eye, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const ResourcesList = () => {
  const { topicId } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, [topicId]);

  const loadResources = async () => {
    try {
      const response = await studentAPI.getResources(topicId);
      setResources(response.data);
    } catch (error) {
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (resourceId) => {
    try {
      await studentAPI.likeResource(resourceId);
      toast.success('Liked!');
      loadResources();
    } catch (error) {
      toast.error('Failed to like resource');
    }
  };

  const handleCopySummary = (summary) => {
    navigator.clipboard.writeText(summary);
    toast.success('Summary copied to clipboard!');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
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
          <h1 className="text-3xl font-bold text-foreground">Resources</h1>
          <p className="mt-2 text-muted-foreground">Access study materials, PDFs, and videos</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : resources.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-center text-muted-foreground">No resources available yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource._id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      {resource.type === 'pdf' ? (
                        <FileText className="mt-1 h-5 w-5 text-primary" />
                      ) : (
                        <Video className="mt-1 h-5 w-5 text-primary" />
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className={`rounded-full px-2 py-0.5 ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </span>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {resource.views || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {resource.likes || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resource.summary && (
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">{resource.summary}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopySummary(resource.summary)}
                        className="w-full"
                      >
                        <Copy className="mr-2 h-3 w-3" />
                        Copy Summary
                      </Button>
                    </div>
                  )}

                  {resource.pdfUrl && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={resource.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-3 w-3" />
                        Download PDF
                      </a>
                    </Button>
                  )}

                  {resource.youtubeLinks && resource.youtubeLinks.length > 0 && (
                    <div className="space-y-2">
                      {resource.youtubeLinks.map((link, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full"
                        >
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-3 w-3" />
                            Watch Video {idx + 1}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}

                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag, idx) => (
                        <span key={idx} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLike(resource._id)}
                      className="flex-1"
                    >
                      <Heart className="mr-2 h-3 w-3" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link to={`/student/resource/${resource._id}`}>
                        <Star className="mr-2 h-3 w-3" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ResourcesList;
