
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';
// import { ArrowLeft, BookOpen } from 'lucide-react';
// import Header from '@/components/layout/Header';

// const BrowseTopics = () => {
//   const { subjectId } = useParams();
//   const navigate = useNavigate();
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login first!');
//       navigate('/login');
//       return;
//     }
//     loadTopics();
//   }, [subjectId]);

//   const loadTopics = async () => {
//     setLoading(true);
//     try {
//       const topicsArray = await studentAPI.getTopicsBySubject(subjectId);
//       setTopics(topicsArray || []);
//     } catch (err) {
//       console.error('Failed to load topics:', err);
//       toast.error('Failed to load topics.');
//       setTopics([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline hover:scale-105 transition-transform duration-300"
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </button>

//         <h1 className="text-3xl font-bold text-foreground mb-6">Select Topic</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : topics.length === 0 ? (
//           <div className="text-center py-20">
//             <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//             <p className="text-muted-foreground text-lg">No topics found for this subject.</p>
//           </div>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {topics.map((topic) => (
//               <Link
//                 key={topic._id}
//                 to={`/student/topic/${topic._id}/resources`}
//               >
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4">
//                   <CardHeader className="p-2">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                         <BookOpen className="h-5 w-5 text-primary" />
//                       </div>
//                       <CardTitle className="text-base font-semibold text-card-foreground">
//                         {topic.name}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>
//                   {topic.description && (
//                     <CardContent className="p-2">
//                       <p className="text-sm text-muted-foreground">{topic.description}</p>
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

// export default BrowseTopics;

//correct code 

// // src/pages/student/BrowseTopics.jsx
// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';
// import { ArrowLeft, BookOpen } from 'lucide-react';

// const BrowseTopics = () => {
//   const { subjectId } = useParams();
//   const navigate = useNavigate();
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!subjectId) return toast.error('Subject ID is missing!');
//     loadTopics();
//   }, [subjectId]);

//   const loadTopics = async () => {
//     setLoading(true);
//     try {
//       const topicsArray = await studentAPI.getTopicsBySubject(subjectId);
//       setTopics(topicsArray || []);
//       if (!topicsArray || topicsArray.length === 0) {
//         toast.error('No topics found for this subject.');
//       }
//     } catch (err) {
//       console.error('Failed to load topics:', err);
//       toast.error('Failed to load topics.');
//       setTopics([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTopicClick = (topicId) => {
//     if (!topicId) return toast.error('Invalid topic selected.');
//     // ✅ Go to ResourcesList instead of trying to fetch the first resource directly
//     navigate(`/student/topic/${topicId}/resources`);
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

//         <h1 className="text-3xl font-bold text-foreground mb-6">Select Topic</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : topics.length === 0 ? (
//           <div className="text-center py-20">
//             <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//             <p className="text-muted-foreground text-lg">
//               No topics found for this subject.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {topics.map((topic) => (
//               <Card
//                 key={topic._id}
//                 onClick={() => handleTopicClick(topic._id)}
//                 className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4"
//               >
//                 <CardHeader className="p-2">
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                       <BookOpen className="h-5 w-5 text-primary" />
//                     </div>
//                     <CardTitle className="text-base font-semibold text-card-foreground">
//                       {topic.name}
//                     </CardTitle>
//                   </div>
//                 </CardHeader>
//                 {topic.description && (
//                   <CardContent className="p-2">
//                     <p className="text-sm text-muted-foreground">{topic.description}</p>
//                   </CardContent>
//                 )}
//               </Card>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BrowseTopics;


import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { studentAPI } from '@/api/student';
import { toast } from 'sonner';
import { ArrowLeft, BookOpen } from 'lucide-react';

const BrowseTopics = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) return toast.error('Subject ID is missing!');
    loadTopics();
  }, [subjectId]);

  const loadTopics = async () => {
    setLoading(true);
    try {
      const topicsArray = await studentAPI.getTopicsBySubject(subjectId);
      setTopics(topicsArray || []);
      if (!topicsArray || topicsArray.length === 0) {
        toast.error('No topics found for this subject.');
      }
    } catch (err) {
      console.error('Failed to load topics:', err);
      toast.error('Failed to load topics.');
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topicId) => {
    if (!topicId) return toast.error('Invalid topic selected.');
    navigate(`/student/topic/${topicId}/resources`);
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

        <h1 className="text-3xl font-bold text-foreground mb-6">Select Topic</h1>

        {loading ? (
          <LoadingSpinner />
        ) : topics.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              No topics found for this subject.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Card
                key={topic._id}
                onClick={() => handleTopicClick(topic._id)}
                className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <CardHeader className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
                      {topic.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                {topic.description && (
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseTopics;

