
// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { BookOpen, ArrowLeft } from 'lucide-react';
// import Header from '@/components/layout/Header';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';

// const BrowseSubjects = () => {
//   const { semesterId } = useParams();
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login first!');
//       navigate('/login');
//       return;
//     }
//     loadSubjects();
//   }, [semesterId]);

//   const loadSubjects = async () => {
//     setLoading(true);
//     try {
//       const subjectsArray = await studentAPI.getSubjects(semesterId);
//       setSubjects(subjectsArray);
//       if (subjectsArray.length === 0) toast.error('No subjects found for this semester.');
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to load subjects.');
//       setSubjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-primary hover:underline">
//           <ArrowLeft className="h-4 w-4" /> Back
//         </button>
//         <h1 className="text-3xl font-bold text-foreground">Select Subject</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : subjects.length === 0 ? (
//           <p className="text-muted-foreground">No subjects found for this semester.</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
//             {subjects.map((subject) => (
//               <Link key={subject._id} to={`/student/subject/${subject._id}/units`}>
//                 <Card className="cursor-pointer hover:shadow-lg transition-all">
//                   <CardHeader>
//                     <div className="flex items-center gap-3">
//                       <div className="rounded-lg bg-primary/10 p-3">
//                         <BookOpen className="h-6 w-6 text-primary" />
//                       </div>
//                       <CardTitle>{subject.name}</CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {subject.description && <p className="text-sm text-muted-foreground">{subject.description}</p>}
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
// export default BrowseSubjects;

//correct code 


// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';
// import { ArrowLeft, BookOpen } from 'lucide-react';

// const BrowseSubjects = () => {
//   const { semesterId } = useParams();
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!semesterId) {
//       toast.error('Semester ID missing');
//       navigate(-1);
//       return;
//     }
//     loadSubjects();
//   }, [semesterId]);

//   const loadSubjects = async () => {
//     setLoading(true);
//     try {
//       const subjectsArray = await studentAPI.getSubjects(semesterId);
//       setSubjects(subjectsArray || []);
//       if (!subjectsArray || subjectsArray.length === 0) {
//         toast.error('No subjects found for this semester.');
//       }
//     } catch (err) {
//       console.error('Failed to load subjects:', err);
//       toast.error('Failed to load subjects.');
//       setSubjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline hover:scale-105 transition-transform duration-300"
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </button>

//         <h1 className="text-3xl font-bold text-foreground mb-6">Select Subject</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : subjects.length === 0 ? (
//           <p className="text-muted-foreground text-center">No subjects found for this semester.</p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {subjects.map((subject) => (
//               <Link key={subject._id} to={`/student/subject/${subject._id}/units`}>
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4">
//                   <CardHeader className="p-2">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                         <BookOpen className="h-5 w-5 text-primary" />
//                       </div>
//                       <CardTitle className="text-base font-semibold text-card-foreground">
//                         {subject.name}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>
//                   {subject.description && (
//                     <CardContent className="p-2">
//                       <p className="text-sm text-muted-foreground">{subject.description}</p>
//                     </CardContent>
//                   )}
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BrowseSubjects;


import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';
import { ArrowLeft, BookOpen } from 'lucide-react';

const BrowseSubjects = () => {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!semesterId) {
      toast.error('Semester ID missing');
      navigate(-1);
      return;
    }
    loadSubjects();
  }, [semesterId]);

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const subjectsArray = await studentAPI.getSubjects(semesterId);
      setSubjects(subjectsArray || []);
      if (!subjectsArray || subjectsArray.length === 0) {
        toast.error('No subjects found for this semester.');
      }
    } catch (err) {
      console.error('Failed to load subjects:', err);
      toast.error('Failed to load subjects.');
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline hover:scale-105 transition-transform duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-6">Select Subject</h1>

        {loading ? (
          <LoadingSpinner />
        ) : subjects.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No subjects found for this semester.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link key={subject._id} to={`/student/subject/${subject._id}/units`}>
                <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        {subject.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  {subject.description && (
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground">{subject.description}</p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseSubjects;
