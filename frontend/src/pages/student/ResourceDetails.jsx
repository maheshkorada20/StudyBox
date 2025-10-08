
// // src/pages/student/ResourceDetails.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { BookOpen, ArrowLeft, ThumbsUp, Eye, Heart, Share2, Copy } from "lucide-react";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { studentAPI } from "@/api/student";
// import { toast } from "sonner";

// const ResourceDetails = () => {
//   const { resourceId } = useParams();
//   const navigate = useNavigate();

//   const [resource, setResource] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [feedbackText, setFeedbackText] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     if (!resourceId) {
//       toast.error("Resource ID missing!");
//       navigate(-1);
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }

//     loadResource();
//   }, [resourceId]);

//   const loadResource = async () => {
//     setLoading(true);
//     try {
//       const res = await studentAPI.getResourceById(resourceId);
//       if (!res) {
//         toast.error("Resource not found.");
//         navigate(-1);
//         return;
//       }

//       setResource(res);
//       setIsFavorite(res.isFavorite || false);

//       // increment view count
//       if (res._id) await studentAPI.incrementView(res._id);

//       // load feedbacks
//       const feedbackRes = await studentAPI.getFeedbacks(res._id);
//       setFeedbacks(feedbackRes || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load resource.");
//       navigate(-1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     if (!resource?._id) return;
//     try {
//       await studentAPI.likeResource(resource._id);
//       toast.success("You liked this resource!");
//       setResource((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to like resource.");
//     }
//   };

//   const handleRating = async (rating) => {
//     if (!resource?._id) return;
//     try {
//       await studentAPI.rateResource(resource._id, rating);
//       setUserRating(rating);
//       toast.success(`You rated this resource ${rating} stars!`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to rate resource.");
//     }
//   };

//   const handleFeedback = async () => {
//     if (!feedbackText.trim() || !resource?._id) return;
//     try {
//       await studentAPI.addFeedback(resource._id, { comment: feedbackText });
//       toast.success("Feedback submitted!");
//       setFeedbackText("");
//       const feedbackRes = await studentAPI.getFeedbacks(resource._id);
//       setFeedbacks(feedbackRes || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit feedback.");
//     }
//   };

//   const handleCopySummary = () => {
//     if (resource?.summary) {
//       navigator.clipboard.writeText(resource.summary);
//       toast.success("Summary copied to clipboard!");
//     }
//   };

//   const toggleFavorite = () => {
//     setIsFavorite((prev) => !prev);
//     toast.success(isFavorite ? "Removed from favorites!" : "Added to favorites!");
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     toast.success("Resource link copied to clipboard!");
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!resource)
//     return (
//       <p className="text-center text-muted-foreground mt-10">Resource not found.</p>
//     );

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8">
//         {/* Back button */}
//         <Button
//           variant="ghost"
//           className="mb-4 flex items-center gap-2"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </Button>

//      {/* Resource Header */}
// <Card className="mb-8 bg-background shadow-md hover:shadow-xl transition-shadow rounded-2xl border border-border">
//   <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 p-6">
    
//     {/* Title Section */}
//     <div className="flex items-center gap-4">
//       <div className="rounded-full bg-primary/20 p-4 flex items-center justify-center">
//         <BookOpen className="h-6 w-6 text-primary" />
//       </div>
//       <CardTitle className="text-2xl font-semibold text-foreground font-sans">{resource.title}</CardTitle>
//     </div>

//     {/* Actions Section */}
//     <div className="flex flex-wrap items-center gap-3 md:gap-4">
      
//       {/* Likes */}
//       <Button 
//         onClick={handleLike} 
//         variant="outline" 
//         className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
//       >
//         <ThumbsUp className="h-4 w-4 text-primary" /> {resource.likes || 0}
//       </Button>

//       {/* Rating */}
//       <div className="flex items-center gap-1">
//         {[1,2,3,4,5].map((star) => (
//           <span
//             key={star}
//             className={`cursor-pointer text-lg transition-transform hover:scale-125 ${
//               userRating >= star ? "text-yellow-400" : "text-muted-foreground"
//             }`}
//             onClick={() => handleRating(star)}
//           >
//             ★
//           </span>
//         ))}
//       </div>

//       {/* Views */}
//       <div className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm text-muted-foreground hover:bg-muted/10 transition-all duration-300">
//         <Eye className="h-4 w-4" /> {resource.views || 0}
//       </div>

//       {/* Favorite */}
//       <Button
//         variant="outline"
//         onClick={toggleFavorite}
//         className="px-3 py-1 border rounded-full hover:bg-red-100 transition-all duration-300 text-sm"
//       >
//         <Heart className={`h-4 w-4 ${isFavorite ? "text-red-500 animate-pulse" : "text-muted-foreground"}`} />
//       </Button>

//       {/* Share */}
//       <Button
//         variant="outline"
//         onClick={handleShare}
//         className="px-3 py-1 border rounded-full hover:bg-blue-100 transition-all duration-300 text-sm"
//       >
//         <Share2 className="h-4 w-4 text-blue-500" />
//       </Button>

//     </div>
//   </CardHeader>
// </Card>


//         {/* Resource Cards */}
//         <div className="space-y-6">
//           {/* YouTube Links Card */}
//           {(resource.youtubeLinks || []).length > 0 && (
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle>YouTube Videos</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-4">
//                   {(resource.youtubeLinks || []).map((vid, idx) => {
//                     const videoId = vid.url.split("v=")[1]?.split("&")[0];
//                     const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//                     return (
//                       <a
//                         key={idx}
//                         href={vid.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-4 p-2 border rounded hover:scale-105 transition-transform"
//                       >
//                         <img src={thumbnail} alt={vid.title} className="w-32 h-20 object-cover rounded" />
//                         <span className="text-sm font-medium">{vid.title || `Video ${idx + 1}`}</span>
//                       </a>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Documentation Card */}
//           {resource.summary && (
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle>Documentation</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative">
//                   <textarea
//                     readOnly
//                     value={resource.summary}
//                     className="w-full p-3 border rounded text-sm resize-none h-64 overflow-y-scroll"
//                   />
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="absolute top-2 right-2"
//                     onClick={handleCopySummary}
//                   >
//                     <Copy className="h-4 w-4 mr-1" /> Copy
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* PDFs Card */}
//           {(resource.pdfs || []).length > 0 && (
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle>PDFs</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
//                   {(resource.pdfs || []).map((pdf, idx) => (
//                     <a
//                       key={idx}
//                       href={pdf.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       download
//                       className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded transition"
//                     >
//                       📄 {pdf.filename || `PDF ${idx + 1}`} (Download)
//                     </a>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         {/* Feedback Section */}
//         <Card className="mt-6 hover:shadow-lg transition-shadow">
//           <CardHeader>
//             <CardTitle>Comments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <textarea
//               className="w-full p-2 border rounded mb-2"
//               placeholder="Add your comment..."
//               value={feedbackText}
//               onChange={(e) => setFeedbackText(e.target.value)}
//             />
//             <Button onClick={handleFeedback}>Submit</Button>

//             <div className="mt-4 space-y-3">
//               {feedbacks.length === 0 && <p>No comments yet.</p>}
//               {feedbacks.map((fb) => (
//                 <div
//                   key={fb._id}
//                   className="border p-3 rounded-md bg-muted/30 hover:shadow-md transition-shadow"
//                 >
//                   <p className="font-medium">{fb.user?.firstName} {fb.user?.lastName}</p>
//                   <p>{fb.comment}</p>
//                   {fb.rating && <p>Rating: {fb.rating} ⭐</p>}
//                   <p className="text-xs text-gray-400">{new Date(fb.createdAt).toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default ResourceDetails;



//correct code 

// // src/pages/student/ResourceDetails.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   BookOpen,
//   ArrowLeft,
//   ThumbsUp,
//   Eye,
//   Heart,
//   Share2,
//   Copy,
// } from "lucide-react";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { studentAPI } from "@/api/student";
// import { toast } from "sonner";

// const ResourceDetails = () => {
//   const { resourceId } = useParams();
//   const navigate = useNavigate();

//   const [resource, setResource] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [feedbackText, setFeedbackText] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     if (!resourceId) {
//       toast.error("Resource ID missing!");
//       navigate(-1);
//       return;
//     }
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }
//     loadResource();
//   }, [resourceId]);

//   const loadResource = async () => {
//     setLoading(true);
//     try {
//       const res = await studentAPI.getResourceById(resourceId);
//       if (!res) {
//         toast.error("Resource not found.");
//         navigate(-1);
//         return;
//       }
//       setResource(res);
//       setIsFavorite(res.isFavorite || false);

//       // increment view count
//       if (res._id) await studentAPI.incrementView(res._id);

//       // load feedbacks
//       const feedbackRes = await studentAPI.getFeedbacks(res._id);
//       setFeedbacks(feedbackRes || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load resource.");
//       navigate(-1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     if (!resource?._id) return;
//     try {
//       await studentAPI.likeResource(resource._id);
//       toast.success("You liked this resource!");
//       setResource((prev) => ({
//         ...prev,
//         likes: (prev.likes || 0) + 1,
//       }));
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to like resource.");
//     }
//   };

//   const handleRating = async (rating) => {
//     if (!resource?._id) return;
//     try {
//       await studentAPI.rateResource(resource._id, rating);
//       setUserRating(rating);
//       toast.success(`You rated this resource ${rating} stars!`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to rate resource.");
//     }
//   };

//   const handleFeedback = async () => {
//     if (!feedbackText.trim() || !resource?._id) return;
//     try {
//       await studentAPI.addFeedback(resource._id, { comment: feedbackText });
//       toast.success("Feedback submitted!");
//       setFeedbackText("");
//       const feedbackRes = await studentAPI.getFeedbacks(resource._id);
//       setFeedbacks(feedbackRes || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit feedback.");
//     }
//   };

//   const handleCopySummary = () => {
//     if (resource?.summary) {
//       navigator.clipboard.writeText(resource.summary);
//       toast.success("Summary copied to clipboard!");
//     }
//   };

//  const toggleFavorite = async () => {
//   if (!resource?._id) return;
//   try {
//     await studentAPI.toggleFavorite(resource._id);
//     setIsFavorite((prev) => !prev);
//     toast.success(
//       isFavorite ? "Removed from favorites!" : "Added to favorites!"
//     );
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to update favorite.");
//   }
// };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     toast.success("Resource link copied to clipboard!");
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!resource)
//     return (
//       <p className="text-center text-muted-foreground mt-10">
//         Resource not found.
//       </p>
//     );

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8">
//         {/* Back button */}
//         <Button
//           variant="ghost"
//           className="mb-4 flex items-center gap-2"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </Button>

//         {/* Resource Header */}
//         <Card className="mb-8 bg-background shadow-md hover:shadow-xl transition-shadow rounded-2xl border border-border">
//           <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 p-6">
//             {/* Title Section */}
//             <div className="flex items-center gap-4">
//               <div className="rounded-full bg-primary/20 p-4 flex items-center justify-center">
//                 <BookOpen className="h-6 w-6 text-primary" />
//               </div>
//               <CardTitle className="text-2xl font-semibold text-foreground font-sans">
//                 {resource.title}
//               </CardTitle>
//             </div>

//             {/* Actions Section */}
//             <div className="flex flex-wrap items-center gap-3 md:gap-4">
//               <Button
//                 onClick={handleLike}
//                 variant="outline"
//                 className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
//               >
//                 <ThumbsUp className="h-4 w-4 text-primary" />{" "}
//                 {resource.likes || 0}
//               </Button>

//               {/* Rating stars */}
//               <div className="flex items-center gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     className={`cursor-pointer text-lg transition-transform hover:scale-125 ${
//                       userRating >= star
//                         ? "text-yellow-400"
//                         : "text-muted-foreground"
//                     }`}
//                     onClick={() => handleRating(star)}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>

//               <div className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm text-muted-foreground hover:bg-muted/10 transition-all duration-300">
//                 <Eye className="h-4 w-4" /> {resource.views || 0}
//               </div>

//               <Button
//                 variant="outline"
//                 onClick={toggleFavorite}
//                 className="px-3 py-1 border rounded-full hover:bg-red-100 transition-all duration-300 text-sm"
//               >
//                 <Heart
//                   className={`h-4 w-4 ${
//                     isFavorite ? "text-red-500 animate-pulse" : "text-muted-foreground"
//                   }`}
//                 />
//               </Button>

//               <Button
//                 variant="outline"
//                 onClick={handleShare}
//                 className="px-3 py-1 border rounded-full hover:bg-blue-100 transition-all duration-300 text-sm"
//               >
//                 <Share2 className="h-4 w-4 text-blue-500" />
//               </Button>
//             </div>
//           </CardHeader>
//         </Card>

//         {/* Resource Content */}
//         <div className="space-y-6">
//           {/* YouTube Links */}
//           {(resource.youtubeLinks || []).length > 0 && (
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle>YouTube Videos</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-4">
//                   {(resource.youtubeLinks || []).map((vid, idx) => {
//                     const videoId = vid.url.split("v=")[1]?.split("&")[0];
//                     const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//                     return (
//                       <a
//                         key={idx}
//                         href={vid.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-4 p-2 border rounded hover:scale-105 transition-transform"
//                       >
//                         <img
//                           src={thumbnail}
//                           alt={vid.title}
//                           className="w-32 h-20 object-cover rounded"
//                         />
//                         <span className="text-sm font-medium">
//                           {vid.title || `Video ${idx + 1}`}
//                         </span>
//                       </a>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Documentation */}
//           {resource.summary && (
//             <Card className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl bg-background">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold">
//                   Documentation
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative">
//                   <textarea
//                     readOnly
//                     value={resource.summary}
//                     className="w-full p-4 border rounded-2xl text-sm resize-none h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted/20"
//                   />
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="absolute top-3 right-3 flex items-center gap-1"
//                     onClick={handleCopySummary}
//                   >
//                     <Copy className="h-4 w-4" /> Copy
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* PDFs */}
//          {/* PDFs */}
// {(resource.pdfs || []).length > 0 && (
//   <Card className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl bg-background">
//     <CardHeader>
//       <CardTitle className="text-lg font-semibold">PDFs</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="flex flex-col gap-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted/20">
//         {(resource.pdfs || []).map((pdf, idx) => {
//           // Ensure every PDF has a filename
//           const filename = pdf.filename || `PDF ${idx + 1}`;
//           return (
//             <a
//               key={idx}
//               href={pdf.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               download
//               className="flex items-center gap-2 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300"
//             >
//               📄 {filename} (Download)
//             </a>
//           );
//         })}
//       </div>
//     </CardContent>
//   </Card>
// )}

//         </div>

//         {/* Feedback Section */}
//         <Card className="mt-6 hover:shadow-lg transition-shadow">
//           <CardHeader>
//             <CardTitle>Comments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <textarea
//               className="w-full p-2 border rounded mb-2"
//               placeholder="Add your comment..."
//               value={feedbackText}
//               onChange={(e) => setFeedbackText(e.target.value)}
//             />
//             <Button onClick={handleFeedback}>Submit</Button>

//             <div className="mt-4 space-y-3">
//               {feedbacks.length === 0 && <p>No comments yet.</p>}
//               {feedbacks.map((fb) => (
//                 <div
//                   key={fb._id}
//                   className="border p-3 rounded-md bg-muted/30 hover:shadow-md transition-shadow"
//                 >
//                   <p className="font-medium">
//                     {fb.user?.firstName} {fb.user?.lastName}
//                   </p>
//                   <p>{fb.comment}</p>
//                   {fb.rating && <p>Rating: {fb.rating} ⭐</p>}
//                   <p className="text-xs text-gray-400">
//                     {new Date(fb.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default ResourceDetails;
 


// // src/pages/student/ResourceDetails.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   BookOpen,
//   ArrowLeft,
//   ThumbsUp,
//   Eye,
//   Heart,
//   Share2,
//   Copy,
// } from "lucide-react";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { studentAPI } from "@/api/student";
// import { toast } from "sonner";

// const ResourceDetails = () => {
//   const { resourceId } = useParams();
//   const navigate = useNavigate();

//   const [resource, setResource] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [feedbackText, setFeedbackText] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     if (!resourceId) {
//       toast.error("Resource ID missing!");
//       navigate(-1);
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }

//     loadResource();
//   }, [resourceId]);

//   const loadResource = async () => {
//     setLoading(true);
//     try {
//       const res = await studentAPI.getResourceById(resourceId);
//       if (!res) {
//         toast.error("Resource not found.");
//         navigate(-1);
//         return;
//       }
//       setResource(res);
//       setIsFavorite(res.isFavorite || false);
//       setUserRating(res.userRating || 0);

//       // Increment view count
//       if (res._id) await studentAPI.incrementView(res._id);

//       // Load feedbacks
//       const feedbackRes = await studentAPI.getFeedbacks(res._id);
//       setFeedbacks(feedbackRes || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load resource.");
//       navigate(-1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     if (!resource?._id) return;
//     try {
//       await studentAPI.likeResource(resource._id);
//       setResource((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
//       toast.success("You liked this resource!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to like resource.");
//     }
//   };

//   const handleRating = async (rating) => {
//     if (!resource?._id) return;
//     try {
//       await studentAPI.rateResource(resource._id, rating);
//       setUserRating(rating);
//       toast.success(`You rated this resource ${rating} ⭐`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to rate resource.");
//     }
//   };

//   const handleFeedback = async () => {
//     if (!feedbackText.trim() || !resource?._id) return;
//     try {
//       await studentAPI.addFeedback(resource._id, { comment: feedbackText });
//       toast.success("Feedback submitted!");
//       setFeedbackText("");
//       const feedbackRes = await studentAPI.getFeedbacks(resource._id);
//       setFeedbacks(feedbackRes || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit feedback.");
//     }
//   };

//   const handleCopySummary = () => {
//     if (resource?.summary) {
//       navigator.clipboard.writeText(resource.summary);
//       toast.success("Summary copied to clipboard!");
//     }
//   };

//   const toggleFavorite = async () => {
//     if (!resource?._id) return;
//     try {
//       await studentAPI.toggleFavorite(resource._id);
//       setIsFavorite((prev) => !prev);
//       toast.success(isFavorite ? "Removed from favorites!" : "Added to favorites!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update favorite.");
//     }
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     toast.success("Resource link copied!");
//   };

//   const getDriveDownloadUrl = (url) => {
//     // Convert Google Drive share URL to direct download
//     const match = url.match(/[-\w]{25,}/);
//     return match ? `https://drive.google.com/uc?export=download&id=${match[0]}` : url;
//   };

//   if (loading) return <LoadingSpinner />;

//   if (!resource)
//     return (
//       <p className="text-center text-muted-foreground mt-10">Resource not found.</p>
//     );

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8">
//         {/* Back button */}
//         <Button
//           variant="ghost"
//           className="mb-4 flex items-center gap-2"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </Button>

//         {/* Resource Header */}
//         <Card className="mb-8 bg-background shadow-md hover:shadow-xl transition-shadow rounded-2xl border border-border">
//           <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 p-6">
//             <div className="flex items-center gap-4">
//               <div className="rounded-full bg-primary/20 p-4 flex items-center justify-center">
//                 <BookOpen className="h-6 w-6 text-primary" />
//               </div>
//               <CardTitle className="text-2xl font-semibold text-foreground font-sans">
//                 {resource.title}
//               </CardTitle>
//             </div>

//             <div className="flex flex-wrap items-center gap-3 md:gap-4">
//               <Button
//                 onClick={handleLike}
//                 variant="outline"
//                 className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
//               >
//                 <ThumbsUp className="h-4 w-4 text-primary" /> {resource.likes || 0}
//               </Button>

//               <div className="flex items-center gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     className={`cursor-pointer text-lg transition-transform hover:scale-125 ${
//                       userRating >= star ? "text-yellow-400" : "text-muted-foreground"
//                     }`}
//                     onClick={() => handleRating(star)}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>

//               <div className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm text-muted-foreground hover:bg-muted/10 transition-all duration-300">
//                 <Eye className="h-4 w-4" /> {resource.views || 0}
//               </div>

//               <Button
//                 variant="outline"
//                 onClick={toggleFavorite}
//                 className="px-3 py-1 border rounded-full hover:bg-red-100 transition-all duration-300 text-sm"
//               >
//                 <Heart
//                   className={`h-4 w-4 ${isFavorite ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}
//                 />
//               </Button>

//               <Button
//                 variant="outline"
//                 onClick={handleShare}
//                 className="px-3 py-1 border rounded-full hover:bg-blue-100 transition-all duration-300 text-sm"
//               >
//                 <Share2 className="h-4 w-4 text-blue-500" />
//               </Button>
//             </div>
//           </CardHeader>
//         </Card>

//         {/* Resource Content */}
//         <div className="space-y-6">
//           {/* YouTube Links */}
//           {(resource.youtubeLinks || []).length > 0 && (
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle>YouTube Videos</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-4">
//                   {(resource.youtubeLinks || []).map((vid, idx) => {
//                     const videoId = vid.url.split("v=")[1]?.split("&")[0];
//                     const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//                     return (
//                       <a
//                         key={idx}
//                         href={vid.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-4 p-2 border rounded hover:scale-105 transition-transform"
//                       >
//                         <img src={thumbnail} alt={vid.title} className="w-32 h-20 object-cover rounded" />
//                         <span className="text-sm font-medium">{vid.title || `Video ${idx + 1}`}</span>
//                       </a>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Documentation */}
//           {resource.summary && (
//             <Card className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl bg-background">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold">Documentation</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative">
//                   <textarea
//                     readOnly
//                     value={resource.summary}
//                     className="w-full p-4 border rounded-2xl text-sm resize-none h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted/20"
//                   />
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="absolute top-3 right-3 flex items-center gap-1"
//                     onClick={handleCopySummary}
//                   >
//                     <Copy className="h-4 w-4" /> Copy
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//          {/* PDFs */}
// {(resource.pdfs || []).length > 0 && (
//   <Card className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl bg-background">
//     <CardHeader>
//       <CardTitle className="text-lg font-semibold">PDFs</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="flex flex-col gap-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted/20">
//         {/* Uploaded PDFs */}
//         {resource.pdfs
//           .filter((p) => p.fileType === "pdf")
//           .map((pdf, idx) => {
//             const url = pdf.url || "#";
//             const filename = pdf.filename || pdf.name || `PDF ${idx + 1}`;
//             const downloadUrl = url.includes("drive.google.com") ? getDriveDownloadUrl(url) : url;
//             return (
//               <div key={idx} className="flex items-center justify-between gap-2 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300">
//                 <span className="truncate">📄 {filename}</span>
//                 <div className="flex gap-2">
//                   <Button size="sm" variant="outline" onClick={() => window.open(url, "_blank")}>View</Button>
//                   <Button size="sm" variant="outline" onClick={() => window.open(downloadUrl, "_blank")}>Download</Button>
//                 </div>
//               </div>
//             );
//           })}

//         {/* PDF URLs */}
//         {resource.pdfs
//           .filter((p) => p.fileType === "url" || !p.fileType)
//           .map((pdf, idx) => {
//             const url = pdf.url;
//             const filename = pdf.filename || url.split("/").pop() || `PDF Link ${idx + 1}`;
//             return (
//               <div key={`url-${idx}`} className="flex items-center justify-between gap-2 p-3 rounded-xl hover:bg-green-100 transition-all duration-300">
//                 <span className="truncate">🔗 {filename}</span>
//                 <div className="flex gap-2">
//                   <Button size="sm" variant="outline" onClick={() => window.open(url, "_blank")}>Open Link</Button>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </CardContent>
//   </Card>
// )}

//         </div>

//         {/* Feedback Section */}
//         <Card className="mt-6 hover:shadow-lg transition-shadow">
//           <CardHeader>
//             <CardTitle>Comments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <textarea
//               className="w-full p-2 border rounded mb-2"
//               placeholder="Add your comment..."
//               value={feedbackText}
//               onChange={(e) => setFeedbackText(e.target.value)}
//             />
//             <Button onClick={handleFeedback}>Submit</Button>

//             <div className="mt-4 space-y-3">
//               {feedbacks.length === 0 && <p>No comments yet.</p>}
//               {feedbacks.map((fb) => (
//                 <div key={fb._id} className="border p-3 rounded-md bg-muted/30 hover:shadow-md transition-shadow">
//                   <p className="font-medium">{fb.user?.firstName} {fb.user?.lastName}</p>
//                   <p>{fb.comment}</p>
//                   {fb.rating && <p>Rating: {fb.rating} ⭐</p>}
//                   <p className="text-xs text-gray-400">{new Date(fb.createdAt).toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default ResourceDetails;

// src/pages/student/ResourceDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, ThumbsUp, Eye, Heart, Share2, Copy } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { studentAPI } from "@/api/student";
import { toast } from "sonner";

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackText, setFeedbackText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!resourceId) {
      toast.error("Resource ID missing!");
      navigate(-1);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    loadResource();
  }, [resourceId]);

  const loadResource = async () => {
    setLoading(true);
    try {
      const res = await studentAPI.getResourceById(resourceId);
      if (!res) {
        toast.error("Resource not found.");
        navigate(-1);
        return;
      }
      setResource(res);
      setIsFavorite(res.isFavorite || false);
      setUserRating(res.userRating || 0);

      if (res._id) await studentAPI.incrementView(res._id);
      const feedbackRes = await studentAPI.getFeedbacks(res._id);
      setFeedbacks(feedbackRes || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resource.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!resource?._id) return;
    try {
      await studentAPI.likeResource(resource._id);
      setResource((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
      toast.success("You liked this resource!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to like resource.");
    }
  };

  const handleRating = async (rating) => {
    if (!resource?._id) return;
    try {
      await studentAPI.rateResource(resource._id, rating);
      setUserRating(rating);
      toast.success(`You rated this resource ${rating} ⭐`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to rate resource.");
    }
  };

  const handleFeedback = async () => {
    if (!feedbackText.trim() || !resource?._id) return;
    try {
      await studentAPI.addFeedback(resource._id, { comment: feedbackText });
      toast.success("Feedback submitted!");
      setFeedbackText("");
      const feedbackRes = await studentAPI.getFeedbacks(resource._id);
      setFeedbacks(feedbackRes || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit feedback.");
    }
  };

  const handleCopySummary = () => {
    if (resource?.summary) {
      navigator.clipboard.writeText(resource.summary);
      toast.success("Summary copied to clipboard!");
    }
  };

  const toggleFavorite = async () => {
    if (!resource?._id) return;
    try {
      await studentAPI.toggleFavorite(resource._id);
      setIsFavorite((prev) => !prev);
      toast.success(isFavorite ? "Removed from favorites!" : "Added to favorites!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update favorite.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Resource link copied!");
  };

  const getDriveDownloadUrl = (url) => {
    if (typeof url !== "string") return url;
    const match = url.match(/[-\w]{25,}/);
    return match ? `https://drive.google.com/uc?export=download&id=${match[0]}` : url;
  };

  if (loading) return <LoadingSpinner />;
  if (!resource)
    return <p className="text-center text-muted-foreground dark:text-gray-300 mt-10">Resource not found.</p>;

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-foreground dark:text-gray-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        {/* Resource Header */}
        <Card className="mb-8 bg-background dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow rounded-2xl border border-border dark:border-gray-700">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/20 p-4 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground dark:text-gray-100 font-sans">
                {resource.title}
              </CardTitle>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Button
                onClick={handleLike}
                variant="outline"
                className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-primary/10 transition-all duration-300 text-sm font-medium dark:border-gray-600 dark:hover:bg-primary/20"
              >
                <ThumbsUp className="h-4 w-4 text-primary" /> {resource.likes || 0}
              </Button>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-lg transition-transform hover:scale-125 ${
                      userRating >= star ? "text-yellow-400" : "text-muted-foreground dark:text-gray-400"
                    }`}
                    onClick={() => handleRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm text-muted-foreground hover:bg-muted/10 transition-all duration-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
                <Eye className="h-4 w-4" /> {resource.views || 0}
              </div>

              <Button
                variant="outline"
                onClick={toggleFavorite}
                className="px-3 py-1 border rounded-full hover:bg-red-100 transition-all duration-300 text-sm dark:border-gray-600 dark:hover:bg-red-600/20"
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? "text-red-500 animate-pulse" : "text-muted-foreground dark:text-gray-400"}`}
                />
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="px-3 py-1 border rounded-full hover:bg-blue-100 transition-all duration-300 text-sm dark:border-gray-600 dark:hover:bg-blue-600/20"
              >
                <Share2 className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Resource Content */}
        <div className="space-y-6">

          {/* YouTube Videos */}
          {(resource.youtubeLinks || []).length > 0 && (
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-gray-100">YouTube Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {(resource.youtubeLinks || []).map((vid, idx) => {
                    const videoId = vid.url.split("v=")[1]?.split("&")[0];
                    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    return (
                      <a
                        key={idx}
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-2 border rounded hover:scale-105 transition-transform dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <img src={thumbnail} alt={vid.title} className="w-32 h-20 object-cover rounded" />
                        <span className="text-sm font-medium dark:text-gray-200">{vid.title || `Video ${idx + 1}`}</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary */}
          {resource.summary && (
            <Card className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl bg-background dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold dark:text-gray-100">Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <textarea
                    readOnly
                    value={resource.summary}
                    className="w-full p-4 border rounded-2xl text-sm resize-none h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted/20 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-primary"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-3 right-3 flex items-center gap-1 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-primary/20"
                    onClick={handleCopySummary}
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PDFs */}
          {(resource.pdfs?.length > 0 || resource.pdfUrls?.length > 0) && (
            <Card className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl bg-background dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold dark:text-gray-100">PDFs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted/20 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-primary">

                  {/* Uploaded PDFs */}
                  {resource.pdfs?.map((pdf, idx) => {
                    const url = pdf.url || "#";
                    const filename = pdf.filename || `PDF ${idx + 1}`;
                    const downloadUrl = url.includes("drive.google.com") ? getDriveDownloadUrl(url) : url;
                    return (
                      <div key={idx} className="flex items-center justify-between gap-2 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 dark:hover:bg-primary/20">
                        <span className="truncate dark:text-gray-200">📄 {filename}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => window.open(url, "_blank")}>View</Button>
                          <Button size="sm" variant="outline" onClick={() => window.open(downloadUrl, "_blank")}>Download</Button>
                        </div>
                      </div>
                    );
                  })}

                  {/* External PDF URLs */}
                  {resource.pdfUrls?.map((pdf, idx) => {
                    const url = pdf.url;
                    const filename = pdf.filename || url.split("/").pop() || `PDF Link ${idx + 1}`;
                    return (
                      <div key={`url-${idx}`} className="flex items-center justify-between gap-2 p-3 rounded-xl hover:bg-green-100 transition-all duration-300 dark:hover:bg-green-700/30">
                        <span className="truncate dark:text-gray-200">🔗 {filename}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => window.open(url, "_blank")}>Open Link</Button>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Comments */}
        <Card className="mt-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full p-2 border rounded mb-2 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200"
              placeholder="Add your comment..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <Button onClick={handleFeedback} className="mb-4">Submit</Button>

            <div className="mt-4 space-y-3">
              {feedbacks.length === 0 && <p className="dark:text-gray-300">No comments yet.</p>}
              {feedbacks.map((fb) => (
                <div key={fb._id} className="border p-3 rounded-md bg-muted/30 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-600">
                  <p className="font-medium dark:text-gray-100">{fb.user?.firstName} {fb.user?.lastName}</p>
                  <p className="dark:text-gray-200">{fb.comment}</p>
                  {fb.rating && <p className="dark:text-yellow-400">Rating: {fb.rating} ⭐</p>}
                  <p className="text-xs text-gray-400 dark:text-gray-400">{new Date(fb.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default ResourceDetails;
