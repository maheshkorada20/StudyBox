import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Shield, Video, FileText, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirect = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
      navigate(redirect);
    }
  }, [user, navigate]);

  const features = [
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: 'Structured Learning',
      description: 'Browse resources by branch, year, semester, and subject with easy navigation.',
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: 'PDF Resources',
      description: 'Access high-quality PDFs for every topic and unit.',
    },
    {
      icon: <Video className="h-6 w-6 text-primary" />,
      title: 'Video Lessons',
      description: 'Watch curated videos to understand complex topics visually.',
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Admin Control',
      description: 'Admins can manage content, subjects, and resources efficiently.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10 transition-colors duration-500">

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
            <BookOpen className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight text-foreground dark:text-white transition-colors duration-500">
            Welcome to StudyBox
          </h1>
          <p className="max-w-3xl text-xl text-muted-foreground dark:text-gray-300 transition-colors duration-500">
            The ultimate learning platform for students and educators. Browse structured study resources, PDFs, videos, and summaries.
          </p>
        </div>
      </section>

      {/* Browse Section */}
      <section id="browse" className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-foreground dark:text-white">Browse Resources</h2>
        <p className="text-lg text-muted-foreground dark:text-gray-300 mb-12">
          Explore structured resources by branch, year, semester, subject, and topic. Access PDFs, videos, and summaries.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full shadow-elevated hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/login">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full shadow-elevated flex items-center justify-center gap-2">
              Search Resources <BookOpen className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-8 shadow-card transition-transform hover:shadow-xl hover:-translate-y-2 animate-fade-in text-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-card-foreground dark:text-white mb-2">{feature.title}</h3>
            <p className="text-muted-foreground dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-foreground dark:text-white">About StudyBox</h2>
        <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
          StudyBox is designed to make learning simple, structured, and engaging. Students can easily navigate resources, while admins maintain full control over content and organization.
        </p>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/70 via-secondary/60 to-primary/80 text-white relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Studies?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of students who are already learning smarter with StudyBox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3">
                Start Learning Now
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
