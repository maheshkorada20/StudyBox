// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Calendar, ArrowLeft } from 'lucide-react';
// import Header from '@/components/layout/Header';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';

// const BrowseSemesters = () => {
//   const { yearId } = useParams();
//   const navigate = useNavigate();
//   const [semesters, setSemesters] = useState([]);
//   const [year, setYear] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login first!');
//       navigate('/login');
//       return;
//     }
//     loadData();
//   }, [yearId]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       // Fetch semesters for the given year
//       const semestersArray = await studentAPI.getSemesters(yearId);

//       // Fetch all branches and years to get current year info
//       const branchesArray = await studentAPI.getBranches();
//       const allYears = await Promise.all(branchesArray.map(b => studentAPI.getYears(b._id)));
//       const flattenedYears = allYears.flat();
//       const currentYear = flattenedYears.find(y => y._id === yearId);

//       setSemesters(semestersArray);
//       setYear(currentYear || null);

//       if (!semestersArray || semestersArray.length === 0) {
//         toast.error('No semesters found for this year.');
//       }
//     } catch (err) {
//       console.error('Failed to load semesters:', err);
//       toast.error('Failed to load semesters');
//       setSemesters([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-primary hover:underline">
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </button>

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground">{year?.name || 'Year'}</h1>
//           <p className="mt-2 text-muted-foreground">Select your semester</p>
//         </div>

//         {loading ? (
//           <LoadingSpinner />
//         ) : semesters.length === 0 ? (
//           <p className="text-muted-foreground">No semesters found for this year.</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {semesters.map((semester) => (
//               <Link key={semester._id} to={`/student/semester/${semester._id}/subjects`}>
//                 <Card className="transition-all hover:shadow-lg cursor-pointer">
//                   <CardHeader>
//                     <div className="flex items-center gap-3">
//                       <div className="rounded-lg bg-primary/10 p-3">
//                         <Calendar className="h-6 w-6 text-primary" />
//                       </div>
//                       <CardTitle>{semester.name}</CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {semester.description && <p className="text-sm text-muted-foreground">{semester.description}</p>}
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

// export default BrowseSemesters;

//correct code 
// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { BookOpen, ArrowLeft } from 'lucide-react';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';

// const BrowseSemesters = () => {
//   const { yearId } = useParams();
//   const navigate = useNavigate();
//   const [semesters, setSemesters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login first!');
//       navigate('/login');
//       return;
//     }
//     loadSemesters();
//   }, [yearId]);

//   const loadSemesters = async () => {
//     setLoading(true);
//     try {
//       const semArray = await studentAPI.getSemesters(yearId);
//       setSemesters(semArray);
//       if (semArray.length === 0) toast.error('No semesters found for this year.');
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to load semesters.');
//       setSemesters([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline hover:scale-105 transition-transform duration-300"
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </button>

//         {/* Page Title */}
//         <h1 className="text-3xl font-bold text-foreground mb-6">Select Semester</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : semesters.length === 0 ? (
//           <p className="text-muted-foreground text-center">No semesters found for this year.</p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {semesters.map((sem) => (
//               <Link key={sem._id} to={`/student/semester/${sem._id}/subjects`}>
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4">
//                   <CardHeader className="p-2">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                         <BookOpen className="h-5 w-5 text-primary" />
//                       </div>
//                       <CardTitle className="text-base font-semibold text-card-foreground">
//                         {sem.name}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>
//                   {sem.description && (
//                     <CardContent className="p-2">
//                       <p className="text-sm text-muted-foreground">{sem.description}</p>
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

// export default BrowseSemesters;


import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const BrowseSemesters = () => {
  const { yearId } = useParams();
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first!');
      navigate('/login');
      return;
    }
    loadSemesters();
  }, [yearId]);

  const loadSemesters = async () => {
    setLoading(true);
    try {
      const semArray = await studentAPI.getSemesters(yearId);
      setSemesters(semArray);
      if (!semArray || semArray.length === 0)
        toast.error('No semesters found for this year.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to load semesters.');
      setSemesters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline hover:scale-105 transition-transform duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-foreground mb-6">Select Semester</h1>

        {loading ? (
          <LoadingSpinner />
        ) : semesters.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No semesters found for this year.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {semesters.map((sem) => (
              <Link key={sem._id} to={`/student/semester/${sem._id}/subjects`}>
                <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        {sem.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  {sem.description && (
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground">{sem.description}</p>
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

export default BrowseSemesters;
