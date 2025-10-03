import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Video, Download, Copy, Heart, Star, ArrowLeft, MessageSquare } from 'lucide-react';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    loadResource();
  }, [resourceId]);

  const loadResource = async () => {
    try {
      const response = await studentAPI.getResourceById(resourceId);
      setResource(response.data);
      await studentAPI.incrementView(resourceId);
    } catch (error) {
      toast.error('Failed to load resource');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await studentAPI.likeResource(resourceId);
      toast.success('Liked!');
      loadResource();
    } catch (error) {
      toast.error('Failed to like resource');
    }
  };

  const handleRate = async (value) => {
    try {
      await studentAPI.rateResource(resourceId, value);
      setRating(value);
      toast.success('Rating submitted!');
      loadResource();
    } catch (error) {
      toast.error('Failed to rate resource');
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error('Please provide a rating');
      return;
    }
    try {
      await studentAPI.addFeedback(resourceId, { rating, comment: feedback });
      toast.success('Feedback submitted!');
      setFeedback('');
      setRating(0);
      loadResource();
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  };

  const handleCopySummary = (summary) => {
    navigator.clipboard.writeText(summary);
    toast.success('Summary copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Resource not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  {resource.type === 'pdf' ? (
                    <FileText className="h-8 w-8 text-primary" />
                  ) : (
                    <Video className="h-8 w-8 text-primary" />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{resource.title}</CardTitle>
                    <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                        {resource.difficulty}
                      </span>
                      <span>{resource.views || 0} views</span>
                      <span>{resource.likes || 0} likes</span>
                      <span>★ {resource.averageRating?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resource.summary && (
                  <div>
                    <h3 className="mb-2 font-semibold">Summary</h3>
                    <p className="text-muted-foreground">{resource.summary}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopySummary(resource.summary)}
                      className="mt-2"
                    >
                      <Copy className="mr-2 h-3 w-3" />
                      Copy Summary
                    </Button>
                  </div>
                )}

                {resource.pdfUrl && (
                  <div>
                    <h3 className="mb-2 font-semibold">PDF Document</h3>
                    <Button asChild className="w-full">
                      <a href={resource.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                )}

                {resource.youtubeLinks && resource.youtubeLinks.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold">Video Links</h3>
                    <div className="space-y-2">
                      {resource.youtubeLinks.map((link, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          asChild
                          className="w-full"
                        >
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-4 w-4" />
                            Watch Video {idx + 1}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {resource.tags && resource.tags.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag, idx) => (
                        <span key={idx} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={handleLike} className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Like ({resource.likes || 0})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feedbacks */}
            {resource.feedbacks && resource.feedbacks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Student Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resource.feedbacks.map((fb, idx) => (
                    <div key={idx} className="border-b border-border pb-4 last:border-0">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= fb.rating ? 'fill-warning text-warning' : 'text-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(fb.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{fb.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Rate & Feedback */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rate this Resource</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Your Rating</Label>
                  <div className="mt-2 flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating ? 'fill-warning text-warning' : 'text-muted'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div>
                    <Label htmlFor="feedback">Your Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts about this resource..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourceDetails;
