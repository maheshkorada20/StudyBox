// import { useState, useEffect } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BookOpen, ArrowLeft, Youtube, FileText, File } from "lucide-react";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { studentAPI } from "@/api/student";
// import { toast } from "sonner";

// const SearchResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const query = queryParams.get("q");

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }
//     if (!query) {
//       navigate("/student/dashboard");
//       return;
//     }
//     searchResources(query);
//   }, [query]);

//   const searchResources = async (searchQuery) => {
//     setLoading(true);
//     try {
//       const searchResults = await studentAPI.searchResources(searchQuery);
//       setResults(searchResults);
//     } catch (err) {
//       console.error("Search failed:", err);
//       toast.error("Failed to fetch search results.");
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8">
//         {/* Back button */}
//         <button
//           className="mb-6 flex items-center gap-2 text-primary hover:underline hover:scale-105 transition-transform duration-300"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft className="h-4 w-4" /> Back
//         </button>

//         <h1 className="text-3xl font-bold text-foreground mb-6">
//           Search Results for "{query}"
//         </h1>

//         {loading ? (
//           <LoadingSpinner />
//         ) : results.length === 0 ? (
//           <p className="text-muted-foreground text-center">No results found.</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {results.map((res) => (
//               <Link
//                 key={res._id}
//                 to={`/student/resource/${res._id}`}
//                 className="w-full"
//               >
//                 <Card className="transition-all hover:shadow-xl cursor-pointer rounded-2xl border border-border bg-background">
//                   <CardHeader>
//                     <div className="flex items-center gap-3">
//                       <div className="rounded-full bg-primary/20 p-3 flex items-center justify-center">
//                         <BookOpen className="h-6 w-6 text-primary" />
//                       </div>
//                       <CardTitle className="text-lg font-semibold text-foreground">
//                         {res.title || "Untitled Resource"}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {res.description && (
//                       <p className="text-sm text-muted-foreground mb-3">
//                         {res.description}
//                       </p>
//                     )}

//                     {/* Resource type icons */}
//                     <div className="flex items-center gap-4 text-sm">
//                       {res.youtubeLinks && res.youtubeLinks.length > 0 && (
//                         <div className="flex items-center gap-1 text-red-500">
//                           <Youtube className="h-4 w-4" /> YouTube
//                         </div>
//                       )}
//                       {res.pdfs && res.pdfs.length > 0 && (
//                         <div className="flex items-center gap-1 text-green-500">
//                           <FileText className="h-4 w-4" /> PDF
//                         </div>
//                       )}
//                       {res.summary && (
//                         <div className="flex items-center gap-1 text-blue-500">
//                           <File className="h-4 w-4" /> Doc
//                         </div>
//                       )}
//                     </div>
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

// export default SearchResults;


import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeft, Youtube, FileText, File } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { studentAPI } from "@/api/student";
import { toast } from "sonner";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    if (!query) {
      navigate("/student/dashboard");
      return;
    }
    searchResources(query);
  }, [query]);

  const searchResources = async (searchQuery) => {
    setLoading(true);
    try {
      const searchResults = await studentAPI.searchResources(searchQuery);
      setResults(searchResults);
    } catch (err) {
      console.error("Search failed:", err);
      toast.error("Failed to fetch search results.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <button
          className="mb-6 flex items-center gap-2 text-primary hover:underline hover:scale-105 transition-transform duration-300"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-6">
          Search Results for "{query}"
        </h1>

        {loading ? (
          <LoadingSpinner />
        ) : results.length === 0 ? (
          <p className="text-muted-foreground text-center">No results found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((res) => (
              <Link key={res._id} to={`/student/resource/${res._id}`} className="w-full">
                <Card className="transition-all hover:shadow-xl cursor-pointer rounded-2xl border border-border bg-background">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-3 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {res.title || "Untitled Resource"}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {res.description && (
                      <p className="text-sm text-muted-foreground mb-3">{res.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      {res.youtubeLinks?.length > 0 && (
                        <div className="flex items-center gap-1 text-red-500">
                          <Youtube className="h-4 w-4" /> YouTube
                        </div>
                      )}
                      {res.pdfs?.length > 0 && (
                        <div className="flex items-center gap-1 text-green-500">
                          <FileText className="h-4 w-4" /> PDF
                        </div>
                      )}
                      {res.summary && (
                        <div className="flex items-center gap-1 text-blue-500">
                          <File className="h-4 w-4" /> Doc
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;

