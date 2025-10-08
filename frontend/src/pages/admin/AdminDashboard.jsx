// import { Link } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { 
//   BookOpen, 
//   Calendar, 
//   BookMarked, 
//   FileText, 
//   FolderTree, 
//   ListTree,
//   Upload
// } from 'lucide-react';
// import Header from '@/components/layout/Header';

// const AdminDashboard = () => {
//   const managementCards = [
//     {
//       title: 'Branches',
//       description: 'Manage academic branches',
//       icon: BookOpen,
//       link: '/admin/branches',
//       color: 'text-blue-500',
//     },
//     {
//       title: 'Years',
//       description: 'Manage academic years',
//       icon: Calendar,
//       link: '/admin/years',
//       color: 'text-green-500',
//     },
//     {
//       title: 'Subjects',
//       description: 'Manage subjects',
//       icon: BookMarked,
//       link: '/admin/subjects',
//       color: 'text-purple-500',
//     },
//     {
//       title: 'Units',
//       description: 'Manage units',
//       icon: FolderTree,
//       link: '/admin/units',
//       color: 'text-orange-500',
//     },
//     {
//       title: 'Topics',
//       description: 'Manage topics',
//       icon: ListTree,
//       link: '/admin/topics',
//       color: 'text-pink-500',
//     },
//     {
//       title: 'Resources',
//       description: 'Upload and manage resources',
//       icon: Upload,
//       link: '/admin/resources',
//       color: 'text-indigo-500',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
//           <p className="mt-2 text-muted-foreground">
//             Manage your educational content and resources
//           </p>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {managementCards.map((card) => {
//             const Icon = card.icon;
//             return (
//               <Card key={card.title} className="transition-all hover:shadow-lg">
//                 <CardHeader>
//                   <div className="flex items-center gap-3">
//                     <div className={`rounded-lg bg-muted p-2 ${card.color}`}>
//                       <Icon className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <CardTitle>{card.title}</CardTitle>
//                       <CardDescription>{card.description}</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <Button asChild className="w-full">
//                     <Link to={card.link}>Manage {card.title}</Link>
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


//correct
// import { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { BookOpen, BookMarked, ListTree, Upload, Users } from 'lucide-react';
// import { adminAPI } from '@/api/admin';

// const AdminDashboard = () => {
//   const [counts, setCounts] = useState({
//     branches: 0,
//     subjects: 0,
//     topics: 0,
//     resources: 0,
//     students: 0,
//     admins: 0,
//   });

//   const [recentUpdates, setRecentUpdates] = useState([]);
//   const [recentResources, setRecentResources] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const data = await adminAPI.getDashboard();
//         if (data) {
//           setCounts(data.counts || {});
//           setRecentUpdates(data.recentUpdates || []);
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard:', error);
//       }
//     };

//     const fetchRecentResources = async () => {
//       try {
//         const resources = await adminAPI.getResources();
//         if (Array.isArray(resources)) {
//           const recent = resources
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//             .slice(0, 5);
//           setRecentResources(recent);
//         }
//       } catch (error) {
//         console.error('Error fetching recent resources:', error);
//       }
//     };

//     fetchDashboard();
//     fetchRecentResources();
//   }, []);

//   const overviewCards = [
//     { title: 'Branches', value: counts.branches, icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
//     { title: 'Subjects', value: counts.subjects, icon: BookMarked, color: 'bg-purple-100 text-purple-600' },
//     { title: 'Topics', value: counts.topics, icon: ListTree, color: 'bg-pink-100 text-pink-600' },
//     { title: 'Resources', value: counts.resources, icon: Upload, color: 'bg-green-100 text-green-600' },
//     { title: 'Students', value: counts.students, icon: Users, color: 'bg-yellow-100 text-yellow-600' },
//     { title: 'Admins', value: counts.admins, icon: Users, color: 'bg-red-100 text-red-600' },
//   ];

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
//         {overviewCards.map((card) => {
//           const Icon = card.icon;
//           return (
//             <Card
//               key={card.title}
//               className="transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
//             >
//               <CardHeader className="flex items-center gap-3">
//                 <div className={`p-3 rounded-lg ${card.color}`}>
//                   <Icon className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <CardTitle>{card.title}</CardTitle>
//                   <CardDescription className="text-foreground/80 text-lg font-semibold">{card.value}</CardDescription>
//                 </div>
//               </CardHeader>
//               <CardContent />
//             </Card>
//           );
//         })}
//       </div>

//       {/* Recent Updates */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold text-foreground mb-4">Recent Updates</h2>
//         <ul className="space-y-2">
//           {recentUpdates.length > 0 ? recentUpdates.map((item, idx) => (
//             <li
//               key={idx}
//               className="p-3 border-l-4 border-blue-500 rounded bg-muted flex justify-between items-center shadow-sm hover:bg-muted/80 transition-colors"
//             >
//               <span className="font-medium">{item.type}: {item.title}</span>
//               <span className="text-xs text-muted-foreground">{dayjs(item.date).format('DD MMM YYYY')}</span>
//             </li>
//           )) : <p className="text-muted-foreground">No recent updates.</p>}
//         </ul>
//       </div>

//       {/* Recently Added Resources */}
//       <div>
//         <h2 className="text-2xl font-semibold text-foreground mb-4">Recently Added Resources</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {recentResources.length > 0 ? recentResources.map((res) => (
//             <Card
//               key={res._id}
//               className="transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
//             >
//               <CardHeader>
//                 <CardTitle>{res.title}</CardTitle>
//                 <CardDescription className="text-foreground/70 text-sm">
//                   {res.topic?.name || 'No Topic'} | {dayjs(res.createdAt).format('DD MMM YYYY')}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-muted-foreground">{res.summary || 'No summary'}</p>
//               </CardContent>
//             </Card>
//           )) : <p className="text-muted-foreground">No recent resources found.</p>}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, BookMarked, ListTree, Upload, Users } from 'lucide-react';
import { adminAPI } from '@/api/admin';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    branches: 0,
    subjects: 0,
    topics: 0,
    resources: 0,
    students: 0,
    admins: 0,
  });

  const [recentUpdates, setRecentUpdates] = useState([]);
  const [recentResources, setRecentResources] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await adminAPI.getDashboard();
        if (data) {
          setCounts(data.counts || {});
          setRecentUpdates(data.recentUpdates || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    const fetchRecentResources = async () => {
      try {
        const resources = await adminAPI.getResources();
        if (Array.isArray(resources)) {
          const recent = resources
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
          setRecentResources(recent);
        }
      } catch (error) {
        console.error('Error fetching recent resources:', error);
      }
    };

    fetchDashboard();
    fetchRecentResources();
  }, []);

  const overviewCards = [
    { title: 'Branches', value: counts.branches, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { title: 'Subjects', value: counts.subjects, icon: BookMarked, color: 'from-purple-500 to-purple-600' },
    { title: 'Topics', value: counts.topics, icon: ListTree, color: 'from-pink-500 to-pink-600' },
    { title: 'Resources', value: counts.resources, icon: Upload, color: 'from-green-500 to-green-600' },
    { title: 'Students', value: counts.students, icon: Users, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Admins', value: counts.admins, icon: Users, color: 'from-red-500 to-red-600' },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="transition-transform transform hover:scale-105 hover:shadow-lg duration-300 rounded-2xl bg-white dark:bg-gray-800"
            >
              <CardHeader className="flex items-center gap-3">
                <div className={`p-3 rounded-xl text-white bg-gradient-to-r ${card.color} shadow-md`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-gray-800 dark:text-gray-100">{card.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-lg font-semibold">{card.value}</CardDescription>
                </div>
              </CardHeader>
              <CardContent />
            </Card>
          );
        })}
      </div>

      {/* Recent Updates */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Updates</h2>
        <ul className="space-y-2">
          {recentUpdates.length > 0 ? recentUpdates.map((item, idx) => (
            <li
              key={idx}
              className="p-3 border-l-4 border-blue-500 rounded-lg bg-white dark:bg-gray-700 flex justify-between items-center shadow-sm hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800 dark:text-gray-100">{item.type}: {item.title}</span>
              <span className="text-xs text-gray-500 dark:text-gray-300">{dayjs(item.date).format('DD MMM YYYY')}</span>
            </li>
          )) : <p className="text-gray-500 dark:text-gray-400">No recent updates.</p>}
        </ul>
      </div>

      {/* Recently Added Resources */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recently Added Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentResources.length > 0 ? recentResources.map((res) => (
            <Card
              key={res._id}
              className="transition-transform transform hover:scale-105 hover:shadow-lg duration-300 rounded-2xl bg-white dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-100">{res.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
                  {res.topic?.name || 'No Topic'} | {dayjs(res.createdAt).format('DD MMM YYYY')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{res.summary || 'No summary'}</p>
              </CardContent>
            </Card>
          )) : <p className="text-gray-500 dark:text-gray-400">No recent resources found.</p>}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
