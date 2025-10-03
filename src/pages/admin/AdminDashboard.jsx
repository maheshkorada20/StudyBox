import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Calendar, 
  BookMarked, 
  FileText, 
  FolderTree, 
  ListTree,
  Upload
} from 'lucide-react';
import Header from '@/components/layout/Header';

const AdminDashboard = () => {
  const managementCards = [
    {
      title: 'Branches',
      description: 'Manage academic branches',
      icon: BookOpen,
      link: '/admin/branches',
      color: 'text-blue-500',
    },
    {
      title: 'Years',
      description: 'Manage academic years',
      icon: Calendar,
      link: '/admin/years',
      color: 'text-green-500',
    },
    {
      title: 'Subjects',
      description: 'Manage subjects',
      icon: BookMarked,
      link: '/admin/subjects',
      color: 'text-purple-500',
    },
    {
      title: 'Units',
      description: 'Manage units',
      icon: FolderTree,
      link: '/admin/units',
      color: 'text-orange-500',
    },
    {
      title: 'Topics',
      description: 'Manage topics',
      icon: ListTree,
      link: '/admin/topics',
      color: 'text-pink-500',
    },
    {
      title: 'Resources',
      description: 'Upload and manage resources',
      icon: Upload,
      link: '/admin/resources',
      color: 'text-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your educational content and resources
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {managementCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg bg-muted p-2 ${card.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={card.link}>Manage {card.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
