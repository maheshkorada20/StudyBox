import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirect = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
      navigate(redirect);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-lg">
            <BookOpen className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <h1 className="mb-4 text-5xl font-bold text-foreground">
            Welcome to StudyBox
          </h1>
          
          <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
            Your comprehensive learning platform for organized study materials. 
            Access curated resources, PDFs, videos, and summaries all in one place.
          </p>

          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-card-foreground">For Students</h3>
            <p className="mb-4 text-muted-foreground">
              Browse through organized study materials by branch, year, semester, and subject. 
              Access PDFs, videos, summaries, and interact with resources.
            </p>
            <Button variant="outline" asChild>
              <Link to="/signup">Join as Student</Link>
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-card-foreground">For Admins</h3>
            <p className="mb-4 text-muted-foreground">
              Manage educational content, upload resources, organize subjects and topics. 
              Complete control over the learning material hierarchy.
            </p>
            <Button variant="outline" asChild>
              <Link to="/signup">Join as Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
