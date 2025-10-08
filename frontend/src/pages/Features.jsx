import { BookOpen, GraduationCap, Shield, Video, FileText } from 'lucide-react';

const Features = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10 transition-colors duration-500 py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-foreground dark:text-white">Features of StudyBox</h1>
        <p className="text-lg text-muted-foreground dark:text-gray-300 mb-12">
          Discover the tools and functionalities designed to make learning seamless and fun.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-xl transition-transform hover:-translate-y-2"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-card-foreground dark:text-white mb-2">{feature.title}</h3>
              <p className="text-muted-foreground dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
