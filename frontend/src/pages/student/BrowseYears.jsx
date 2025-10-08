

// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Calendar, ArrowLeft } from 'lucide-react';
// import Header from '@/components/layout/Header';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';

// const BrowseYears = () => {
//   const { branchId } = useParams();
//   const navigate = useNavigate();
//   const [years, setYears] = useState([]);
//   const [branch, setBranch] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login first!');
//       navigate('/login');
//       return;
//     }
//     loadData();
//   }, [branchId]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       // Fetch years and branch info
//       const [yearsArray, branchesArray] = await Promise.all([
//         studentAPI.getYears(branchId),
//         studentAPI.getBranches()
//       ]);

//       setYears(yearsArray);
//       setBranch(branchesArray.find(b => b._id === branchId) || null);

//       if (!yearsArray || yearsArray.length === 0) {
//         toast.error('No years found for this branch.');
//       }
//     } catch (err) {
//       console.error('Failed to load years:', err);
//       toast.error('Failed to load years');
//       setYears([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <button onClick={() => navigate('/student/dashboard')} className="mb-4 flex items-center gap-2 text-sm text-primary hover:underline">
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground">{branch?.name || 'Branch'}</h1>
//           <p className="mt-2 text-muted-foreground">Select your academic year</p>
//         </div>

//         {loading ? (
//           <LoadingSpinner />
//         ) : years.length === 0 ? (
//           <p className="text-muted-foreground">No years found for this branch.</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {years.map((year) => (
//               <Link key={year._id} to={`/student/year/${year._id}/semesters`}>
//                 <Card className="transition-all hover:shadow-lg cursor-pointer">
//                   <CardHeader>
//                     <div className="flex items-center gap-3">
//                       <div className="rounded-lg bg-primary/10 p-3">
//                         <Calendar className="h-6 w-6 text-primary" />
//                       </div>
//                       <CardTitle>{year.name}</CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {year.description && <p className="text-sm text-muted-foreground">{year.description}</p>}
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

// export default BrowseYears;

//correct code

// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { BookOpen, ArrowLeft } from 'lucide-react';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';

// const BrowseYears = () => {
//   const { branchId } = useParams();
//   const navigate = useNavigate();
//   const [years, setYears] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login first!');
//       navigate('/login');
//       return;
//     }
//     loadYears();
//   }, [branchId]);

//   const loadYears = async () => {
//     setLoading(true);
//     try {
//       const yearsArray = await studentAPI.getYears(branchId);
//       setYears(yearsArray);
//       if (yearsArray.length === 0) toast.error('No years found for this branch.');
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to load years.');
//       setYears([]);
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
//         <h1 className="text-3xl font-bold text-foreground mb-6">Select Year</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : years.length === 0 ? (
//           <p className="text-muted-foreground text-center">No years found for this branch.</p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {years.map((year) => (
//               <Link key={year._id} to={`/student/year/${year._id}/semesters`}>
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4">
//                   <CardHeader className="p-2">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                         <BookOpen className="h-5 w-5 text-primary" />
//                       </div>
//                       <CardTitle className="text-base font-semibold text-card-foreground">
//                         {year.name}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>
//                   {year.description && (
//                     <CardContent className="p-2">
//                       <p className="text-sm text-muted-foreground">{year.description}</p>
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

// export default BrowseYears;


import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';

const BrowseYears = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first!');
      navigate('/login');
      return;
    }
    loadYears();
  }, [branchId]);

  const loadYears = async () => {
    setLoading(true);
    try {
      const yearsArray = await studentAPI.getYears(branchId);
      setYears(yearsArray);
      if (!yearsArray || yearsArray.length === 0)
        toast.error('No years found for this branch.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to load years.');
      setYears([]);
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
        <h1 className="text-3xl font-bold text-foreground mb-6">Select Year</h1>

        {loading ? (
          <LoadingSpinner />
        ) : years.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No years found for this branch.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {years.map((year) => (
              <Link key={year._id} to={`/student/year/${year._id}/semesters`}>
                <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        {year.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  {year.description && (
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground">{year.description}</p>
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

export default BrowseYears;
