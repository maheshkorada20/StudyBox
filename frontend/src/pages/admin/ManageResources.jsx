// // src/pages/admin/ManageResources.jsx
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { motion } from 'framer-motion';
// import { BookOpen, Calendar, Layers, FileText, File, Video, ListChecks, Archive } from 'lucide-react';

// const entities = [
//   { name: 'Branches', icon: BookOpen, route: '/admin/branches', color: 'bg-blue-500' },
//   { name: 'Years', icon: Calendar, route: '/admin/years', color: 'bg-green-500' },
//   { name: 'Semesters', icon: Layers, route: '/admin/semesters', color: 'bg-purple-500' },
//   { name: 'Subjects', icon: FileText, route: '/admin/subjects', color: 'bg-yellow-500' },
//   { name: 'Units', icon: File, route: '/admin/units', color: 'bg-pink-500' },
//   { name: 'Topics', icon: ListChecks, route: '/admin/topics', color: 'bg-indigo-500' },
//   { name: 'Resources', icon: Video, route: '/admin/resources', color: 'bg-red-500' },
//   { name: 'All Resources', icon: Archive, route: '/admin/all-resources', color: 'bg-teal-500' },
// ];

// const ManageResources = () => {
//   const navigate = useNavigate();

//   const handleNavigate = (route) => {
//     // If route is branches, open AdminBranches page
//     if (route === '/admin/branches') {
//       navigate('/admin/branches');
//     } else {
//       navigate(route);
//     }
//   };

//   return (
//     <main className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Resources</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {entities.map((entity, idx) => {
//           const Icon = entity.icon;
//           return (
//             <motion.div
//               key={entity.name}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.1, duration: 0.4 }}
//               whileHover={{ scale: 1.05 }}
//               className="cursor-pointer"
//               onClick={() => handleNavigate(entity.route)}
//             >
//               <Card className="shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 rounded-2xl">
//                 <CardHeader className="flex items-center gap-4">
//                   <div className={`${entity.color} p-3 rounded-xl text-white`}>
//                     <Icon size={24} />
//                   </div>
//                   <CardTitle className="text-lg font-semibold">{entity.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {entity.name === 'All Resources'
//                       ? 'View all uploaded resources uploaded by admin'
//                       : `Click to manage ${entity.name.toLowerCase()} (add, update, delete)`}
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </div>
//     </main>
//   );
// };

// export default ManageResources;


import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Layers, FileText, File, Video, ListChecks, Archive } from 'lucide-react';

const entities = [
  { name: 'Branches', icon: BookOpen, route: '/admin/branches', color: 'from-blue-500 to-blue-600' },
  { name: 'Years', icon: Calendar, route: '/admin/years', color: 'from-green-500 to-green-600' },
  { name: 'Semesters', icon: Layers, route: '/admin/semesters', color: 'from-purple-500 to-purple-600' },
  { name: 'Subjects', icon: FileText, route: '/admin/subjects', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Units', icon: File, route: '/admin/units', color: 'from-pink-500 to-pink-600' },
  { name: 'Topics', icon: ListChecks, route: '/admin/topics', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Resources', icon: Video, route: '/admin/resources', color: 'from-red-500 to-red-600' },
  { name: 'All Resources', icon: Archive, route: '/admin/all-resources', color: 'from-teal-500 to-teal-600' },
];

const ManageResources = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Resources</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {entities.map((entity, idx) => {
          const Icon = entity.icon;
          return (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => handleNavigate(entity.route)}
            >
              <Card className="shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 rounded-2xl bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl text-white bg-gradient-to-r ${entity.color} shadow-md`}>
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{entity.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {entity.name === 'All Resources'
                      ? 'View all uploaded resources by admin with edit & delete options'
                      : `Click to manage ${entity.name.toLowerCase()} (add, update, delete)`}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
};

export default ManageResources;
