import { BookOpen, User, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10 transition-colors duration-500 py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-foreground dark:text-white">About StudyBox</h1>
        <p className="text-lg text-muted-foreground dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          StudyBox is designed to help students and educators interact with structured learning resources in a seamless way.
          From PDFs and videos to summaries and hierarchical subject navigation, everything is optimized for efficient studying.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-xl transition-transform hover:-translate-y-2">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground dark:text-white mb-2">Comprehensive Resources</h3>
            <p className="text-muted-foreground dark:text-gray-300">
              PDFs, videos, and summaries organized for every subject, unit, and topic.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-xl transition-transform hover:-translate-y-2">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground dark:text-white mb-2">Student-Friendly</h3>
            <p className="text-muted-foreground dark:text-gray-300">
              Designed to make navigation and learning intuitive for students of all levels.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-xl transition-transform hover:-translate-y-2">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground dark:text-white mb-2">Collaborative</h3>
            <p className="text-muted-foreground dark:text-gray-300">
              Supports interaction between students and educators, promoting effective collaborative learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
