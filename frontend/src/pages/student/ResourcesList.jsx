
// // src/pages/student/ResourcesList.jsx
// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { studentAPI } from "@/api/student";
// import { toast } from "sonner";
// import { ArrowLeft, BookOpen } from "lucide-react";

// const ResourcesList = () => {
//   const { topicId } = useParams();
//   const navigate = useNavigate();
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!topicId) {
//       toast.error("Topic ID missing!");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }

//     loadResources();
//   }, [topicId]);

//   const loadResources = async () => {
//     setLoading(true);
//     try {
//       const resArray = await studentAPI.getResourcesByTopic(topicId);
//       setResources(resArray || []);
//       if (!resArray || resArray.length === 0) {
//         toast.error("No resources found for this topic.");
//       }
//     } catch (err) {
//       console.error("Failed to load resources:", err);
//       toast.error("Failed to load resources.");
//       setResources([]);
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

//         <h1 className="text-3xl font-bold text-foreground mb-6">Resources</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : resources.length === 0 ? (
//           <p className="text-muted-foreground text-center">
//             No resources found for this topic.
//           </p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {resources.map((res) => (
//               <Link key={res._id} to={`/student/resource/${res._id}`}>
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4">
//                   <CardHeader className="p-2">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                         <BookOpen className="h-5 w-5 text-primary" />
//                       </div>
//                       <CardTitle className="text-base font-semibold text-card-foreground">
//                         {res.title || "Untitled Resource"}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>

//                   <CardContent className="p-2 space-y-2">
//                     {/* Summary */}
//                     {res.summary && <p className="text-sm text-muted-foreground">{res.summary}</p>}

//                     {/* PDFs */}
//                     {(res.pdfs || []).length > 0 && (
//                       <div>
//                         {(res.pdfs || []).map((pdf, idx) => (
//                           <a
//                             key={idx}
//                             href={pdf.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-primary hover:underline block text-sm"
//                           >
//                             {pdf.filename || `PDF ${idx + 1}`}
//                           </a>
//                         ))}
//                       </div>
//                     )}

//                     {/* YouTube Videos */}
//                     {(res.youtubeLinks || []).length > 0 && (
//                       <div>
//                         {(res.youtubeLinks || []).map((vid, idx) => (
//                           <a
//                             key={idx}
//                             href={vid.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-red-600 hover:underline block text-sm"
//                           >
//                             {vid.title || `Video ${idx + 1}`}
//                           </a>
//                         ))}
//                       </div>
//                     )}
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

// export default ResourcesList;

//correct code


// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { studentAPI } from "@/api/student";
// import { toast } from "sonner";
// import { ArrowLeft, BookOpen, Youtube, FileText, File } from "lucide-react";

// const ResourcesList = () => {
//   const { topicId } = useParams();
//   const navigate = useNavigate();
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!topicId) {
//       toast.error("Topic ID missing!");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }

//     loadResources();
//   }, [topicId]);

//   const loadResources = async () => {
//     setLoading(true);
//     try {
//       const resArray = await studentAPI.getResourcesByTopic(topicId);
//       setResources(resArray || []);
//       if (!resArray || resArray.length === 0) {
//         toast.error("No resources found for this topic.");
//       }
//     } catch (err) {
//       console.error("Failed to load resources:", err);
//       toast.error("Failed to load resources.");
//       setResources([]);
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

//         <h1 className="text-3xl font-bold text-foreground mb-6">Resources</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : resources.length === 0 ? (
//           <p className="text-muted-foreground text-center">
//             No resources found for this topic.
//           </p>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {resources.map((res) => (
//               <Link key={res._id} to={`/student/resource/${res._id}`}>
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-lg p-4">
//                   <CardHeader className="p-2">
//                     <div className="flex flex-col gap-2">
//                       {/* Title Section */}
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-r from-primary/20 to-secondary/20">
//                           <BookOpen className="h-5 w-5 text-primary" />
//                         </div>
//                         <CardTitle className="text-base font-semibold text-card-foreground">
//                           {res.title || "Untitled Resource"}
//                         </CardTitle>
//                       </div>

//                       {/* Icons Section */}
//                       <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
//                         {/* YouTube icon only if YouTube links exist */}
//                         {res.youtubeLinks?.length > 0 && (
//                           <div className="flex items-center gap-1">
//                             <Youtube className="h-4 w-4 text-red-500" /> YouTube
//                           </div>
//                         )}

//                         {/* PDF icon always shows as dummy */}
//                         <div className="flex items-center gap-1">
//                           <FileText className={`h-4 w-4 ${res.pdfs?.length > 0 ? "text-blue-500" : "text-gray-400"}`} />
//                           PDFs
//                         </div>

//                         {/* Documentation icon only if summary exists */}
//                         {res.summary && (
//                           <div className="flex items-center gap-1">
//                             <File className="h-4 w-4 text-green-500" /> Documentation
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardHeader>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ResourcesList;

//correct code

// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { studentAPI } from "@/api/student";
// import { toast } from "sonner";
// import { ArrowLeft, BookOpen, Youtube, FileText, File } from "lucide-react";

// const ResourcesList = () => {
//   const { topicId } = useParams();
//   const navigate = useNavigate();
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!topicId) {
//       toast.error("Topic ID missing!");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }

//     loadResources();
//   }, [topicId]);

//   const loadResources = async () => {
//     setLoading(true);
//     try {
//       const resArray = await studentAPI.getResourcesByTopic(topicId);
//       setResources(resArray || []);
//       if (!resArray || resArray.length === 0) {
//         toast.error("No resources found for this topic.");
//       }
//     } catch (err) {
//       console.error("Failed to load resources:", err);
//       toast.error("Failed to load resources.");
//       setResources([]);
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

//         <h1 className="text-3xl font-bold text-foreground mb-6">Resources</h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : resources.length === 0 ? (
//           <p className="text-muted-foreground text-center">
//             No resources found for this topic.
//           </p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {resources.map((res) => (
//               <Link key={res._id} to={`/student/resource/${res._id}`}>
//                 <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//                   <CardHeader className="p-3">
//                     <div className="flex flex-col gap-3">
//                       {/* Title Section */}
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
//                           <BookOpen className="h-5 w-5 text-primary" />
//                         </div>
//                         <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
//                           {res.title || "Untitled Resource"}
//                         </CardTitle>
//                       </div>

//                       {/* Icons Section */}
//                       <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
//                         {/* YouTube icon only if YouTube links exist */}
//                         {res.youtubeLinks?.length > 0 && (
//                           <div className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-200 rounded-full text-red-600 dark:text-red-700">
//                             <Youtube className="h-4 w-4" /> Videos
//                           </div>
//                         )}

//                         {/* PDF icon */}
//                         <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${res.pdfs?.length > 0 ? 'bg-blue-100 dark:bg-blue-200 text-blue-600 dark:text-blue-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
//                           <FileText className="h-4 w-4" /> PDFs
//                         </div>

//                         {/* Documentation icon */}
//                         {res.summary && (
//                           <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-200 rounded-full text-green-600 dark:text-green-700">
//                             <File className="h-4 w-4" /> Documentation
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardHeader>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ResourcesList;

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { studentAPI } from "@/api/student";
import { toast } from "sonner";
import { ArrowLeft, BookOpen, Youtube, FileText, File } from "lucide-react";

const ResourcesList = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topicId) {
      toast.error("Topic ID missing!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    loadResources();
  }, [topicId]);

  const loadResources = async () => {
    setLoading(true);
    try {
      const resArray = await studentAPI.getResourcesByTopic(topicId);

      // Normalize arrays for consistent rendering
      const normalizedResources = (resArray || []).map((res) => ({
        ...res,
        pdfs: res.pdfs || [],
        pdfUrls: res.pdfUrls || [],
        resourceUrls: res.resourceUrls || [],
        youtubeLinks: res.youtubeLinks || [],
      }));

      setResources(normalizedResources);

      if (!resArray || resArray.length === 0) {
        toast.error("No resources found for this topic.");
      }
    } catch (err) {
      console.error("Failed to load resources:", err);
      toast.error("Failed to load resources.");
      setResources([]);
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

        <h1 className="text-3xl font-bold text-foreground mb-6">Resources</h1>

        {loading ? (
          <LoadingSpinner />
        ) : resources.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No resources found for this topic.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((res) => (
              <Link key={res._id} to={`/student/resource/${res._id}`}>
                <Card className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl shadow-card rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardHeader className="p-3">
                    <div className="flex flex-col gap-3">
                      {/* Title Section */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
                          {res.title || "Untitled Resource"}
                        </CardTitle>
                      </div>

                      {/* Icons Section */}
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        {/* YouTube icon */}
                        {res.youtubeLinks?.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-200 rounded-full text-red-600 dark:text-red-700">
                            <Youtube className="h-4 w-4" /> Videos
                          </div>
                        )}

                        {/* PDF icon */}
                        {(res.pdfs?.length > 0 || res.pdfUrls?.length > 0) && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-200 rounded-full text-blue-600 dark:text-blue-700">
                            <FileText className="h-4 w-4" /> PDFs
                          </div>
                        )}

                        {/* Documentation icon */}
                        {res.summary && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-200 rounded-full text-green-600 dark:text-green-700">
                            <File className="h-4 w-4" /> Documentation
                          </div>
                        )}

                        {/* Other resource URLs icon */}
                        {res.resourceUrls?.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-200 rounded-full text-yellow-600 dark:text-yellow-700">
                            🌐 Links
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ResourcesList;
