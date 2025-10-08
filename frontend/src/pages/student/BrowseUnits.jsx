
//correct code 
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';
// import { ArrowLeft, BookOpen } from 'lucide-react';

// const BrowseUnits = () => {
//   const { subjectId } = useParams();
//   const navigate = useNavigate();
//   const [units, setUnits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!subjectId) {
//       toast.error('Subject ID missing');
//       navigate(-1);
//       return;
//     }
//     loadUnits();
//   }, [subjectId]);

//   const loadUnits = async () => {
//     setLoading(true);
//     try {
//       const unitsArray = await studentAPI.getUnits(subjectId);
//       setUnits(unitsArray || []);
//       if (!unitsArray || unitsArray.length === 0) {
//         toast.error('No units found for this subject.');
//       }
//     } catch (err) {
//       console.error('Failed to load units:', err);
//       toast.error('Failed to load units.');
//       setUnits([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline hover:scale-105 transition-transform duration-300"
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </button>

//         <h1 className="text-3xl font-bold text-foreground mb-6">Select Unit</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : units.length === 0 ? (
//           <p className="text-muted-foreground text-center">No units found for this subject.</p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {units.map((unit) => (
//               <Link
//                 key={unit._id}
//                 to={`/student/subject/${subjectId}/topics`} // topics are now fetched by subject
//               >
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4">
//                   <CardHeader className="p-2">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                         <BookOpen className="h-5 w-5 text-primary" />
//                       </div>
//                       <CardTitle className="text-base font-semibold text-card-foreground">
//                         {unit.name}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>
//                   {unit.description && (
//                     <CardContent className="p-2">
//                       <p className="text-sm text-muted-foreground">{unit.description}</p>
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

// export default BrowseUnits;


import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';
import { ArrowLeft, BookOpen } from 'lucide-react';

const BrowseUnits = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) {
      toast.error('Subject ID missing');
      navigate(-1);
      return;
    }
    loadUnits();
  }, [subjectId]);

  const loadUnits = async () => {
    setLoading(true);
    try {
      const unitsArray = await studentAPI.getUnits(subjectId);
      setUnits(unitsArray || []);
      if (!unitsArray || unitsArray.length === 0) {
        toast.error('No units found for this subject.');
      }
    } catch (err) {
      console.error('Failed to load units:', err);
      toast.error('Failed to load units.');
      setUnits([]);
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

        <h1 className="text-3xl font-bold text-foreground mb-6">Select Unit</h1>

        {loading ? (
          <LoadingSpinner />
        ) : units.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No units found for this subject.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <Link
                key={unit._id}
                to={`/student/subject/${subjectId}/topics`}
              >
                <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        {unit.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  {unit.description && (
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground">{unit.description}</p>
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

export default BrowseUnits;
