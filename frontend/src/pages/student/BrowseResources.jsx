// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BookOpen, Search, ChevronRight, Video, FileText, ListChecks } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { studentAPI } from "@/api/student";
// import LoadingSpinner from "@/components/common/LoadingSpinner";

// const BrowseResources = () => {
//   const navigate = useNavigate();
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showBranches, setShowBranches] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch branches
//   useEffect(() => {
//     const fetchBranches = async () => {
//       setLoading(true);
//       try {
//         const branchList = await studentAPI.getBranches();
//         setBranches(branchList || []);
//       } catch (err) {
//         console.error(err);
//         toast.error(err.message || "Failed to load branches.");
//         setBranches([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBranches();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/student/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-background py-10">
//       <main className="container mx-auto px-4 space-y-10">

//         {/* Search Card */}
//         <Card className="shadow-sm border">
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold text-foreground">
//               Find Your Resources
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSearch} className="relative flex items-center">
//               <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by keyword, subject, or topic..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none transition"
//               />
//               <button
//                 type="submit"
//                 className="ml-3 px-6 py-3 bg-primary text-white font-medium rounded-lg shadow hover:scale-105 transition-transform"
//               >
//                 Search
//               </button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Start Browsing Card */}
//         <Card className="shadow-sm border text-center">
//           <CardContent className="py-6">
//             <h2 className="text-base text-muted-foreground mb-4">
//               Or start browsing by branch
//             </h2>
//             <button
//               onClick={() => setShowBranches(!showBranches)}
//               className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
//             >
//               Start Browsing
//             </button>
//           </CardContent>
//         </Card>

//         {/* Website Flow (Guide Section) */}
//         <div className="bg-muted rounded-xl p-6 shadow-inner">
//           <h3 className="text-lg font-semibold mb-4 text-foreground text-center">
//             How It Works
//           </h3>
//           <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium text-muted-foreground">
//             <span>Branch</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Year</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Subject</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Unit</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Topic</span>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <Video className="w-4 h-4 text-primary" />
//               <span>Videos</span>
//             </div>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <FileText className="w-4 h-4 text-primary" />
//               <span>PDFs</span>
//             </div>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <ListChecks className="w-4 h-4 text-primary" />
//               <span>Summaries</span>
//             </div>
//           </div>
//         </div>

//         {/* Branch Grid */}
//         {showBranches && (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {branches.length === 0 ? (
//               <p className="text-center text-muted-foreground">
//                 No branches available.
//               </p>
//             ) : (
//               branches.map((branch) => (
//                 <Link key={branch._id} to={`/student/branch/${branch._id}/years`}>
//                   <Card className="transition hover:shadow-md cursor-pointer">
//                     <CardHeader className="flex items-center gap-3">
//                       <BookOpen className="h-6 w-6 text-primary" />
//                       <CardTitle className="text-base font-medium">
//                         {branch.name}
//                       </CardTitle>
//                     </CardHeader>
//                   </Card>
//                 </Link>
//               ))
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BrowseResources;
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BookOpen, Search, ChevronRight, Video, FileText, ListChecks } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { studentAPI } from "@/api/student";
// import LoadingSpinner from "@/components/common/LoadingSpinner";

// const BrowseResources = () => {
//   const navigate = useNavigate();
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showBranches, setShowBranches] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [placeholder, setPlaceholder] = useState("Search resources...");

//   // Rotating placeholders
//   const placeholders = ["Search resources...", "Search subjects...", "Search topics..."];
//   useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setPlaceholder(placeholders[i]);
//       i = (i + 1) % placeholders.length;
//     }, 2500); // rotate every 2.5s
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch branches
//   useEffect(() => {
//     const fetchBranches = async () => {
//       setLoading(true);
//       try {
//         const branchList = await studentAPI.getBranches();
//         setBranches(branchList || []);
//       } catch (err) {
//         console.error(err);
//         toast.error(err.message || "Failed to load branches.");
//         setBranches([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBranches();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/student/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-background py-10">
//       <main className="container mx-auto px-4 space-y-10">
// {/* Search Card */}
// <Card className="shadow-sm border hover:shadow-lg transition-shadow duration-300">
//   <CardHeader>
//     <CardTitle className="text-xl font-semibold text-foreground">
//       Find Your Resources
//     </CardTitle>
//   </CardHeader>
//   <CardContent className="pt-6">
//     <form onSubmit={handleSearch} className="flex gap-2">
//       <div className="relative flex-1">
//         <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//         <Input
//           type="text"
//           placeholder={placeholder} // rotating placeholder
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
//         />
//       </div>
//       <button
//         type="submit"
//         className="px-4 py-1 rounded bg-primary text-white hover:scale-105 hover:bg-primary/90 transition-transform duration-300"
//       >
//         Search
//       </button>
//     </form>
//   </CardContent>
// </Card>

//         {/* Start Browsing Card */}
//         <Card className="shadow-sm border text-center hover:shadow-lg transition-shadow duration-300">
//           <CardContent className="py-6">
//             <h2 className="text-base text-muted-foreground mb-4">
//               Or start browsing by branch
//             </h2>
//             <button
//               onClick={() => setShowBranches(!showBranches)}
//               className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow hover:scale-105 hover:brightness-110 transition-transform duration-300"
//             >
//               Start Browsing
//             </button>
//           </CardContent>
//         </Card>

//         {/* Branch Grid */}
//         {showBranches && (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {branches.length === 0 ? (
//               <p className="text-center text-muted-foreground">
//                 No branches available.
//               </p>
//             ) : (
//               branches.map((branch) => (
//                 <Link key={branch._id} to={`/student/branch/${branch._id}/years`}>
//                   <Card className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
//                     <CardHeader className="flex items-center gap-3">
//                       <BookOpen className="h-6 w-6 text-primary" />
//                       <CardTitle className="text-base font-medium">
//                         {branch.name}
//                       </CardTitle>
//                     </CardHeader>
//                   </Card>
//                 </Link>
//               ))
//             )}
//           </div>
//         )}

//         {/* Website Flow (Guide Section) - BELOW Branch Grid / above footer */}
//         <div className="bg-muted rounded-xl p-6 shadow-inner mt-10">
//           <h3 className="text-lg font-semibold mb-4 text-foreground text-center">
//             How It Works
//           </h3>
//           <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium text-muted-foreground">
//             <span>Branch</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Year</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Subject</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Unit</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Topic</span>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <Video className="w-4 h-4 text-primary" />
//               <span>Videos</span>
//             </div>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <FileText className="w-4 h-4 text-primary" />
//               <span>PDFs</span>
//             </div>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <ListChecks className="w-4 h-4 text-primary" />
//               <span>Summaries</span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BrowseResources;

//correct code 

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BookOpen, ChevronRight, Video, FileText, ListChecks } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { studentAPI } from "@/api/student";
// import LoadingSpinner from "@/components/common/LoadingSpinner";

// const BrowseResources = () => {
//   const navigate = useNavigate();
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showBranches, setShowBranches] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [placeholder, setPlaceholder] = useState("Search resources...");

//   const placeholders = ["Search resources...", "Search subjects...", "Search topics..."];
//   useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setPlaceholder(placeholders[i]);
//       i = (i + 1) % placeholders.length;
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch branches safely
//   useEffect(() => {
//     const fetchBranches = async () => {
//       setLoading(true);
//       try {
//         const res = await studentAPI.getBranches();
//         // Support different response formats
//         const branchList = res?.data || res?.branches || res || [];
//         setBranches(Array.isArray(branchList) ? branchList : []);
//       } catch (err) {
//         console.error(err);
//         toast.error(err?.message || err?.response?.data?.error || "Failed to load branches.");
//         setBranches([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBranches();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/student/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-background py-10">
//       <main className="container mx-auto px-4 space-y-10">
//         {/* Search Card */}
//         <Card className="shadow-sm border hover:shadow-lg transition-shadow duration-300">
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold text-foreground">
//               Find Your Resources
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <form onSubmit={handleSearch} className="flex gap-2">
//               <div className="relative flex-1">
//                 <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="text"
//                   placeholder={placeholder}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="px-4 py-1 rounded bg-primary text-white hover:scale-105 hover:bg-primary/90 transition-transform duration-300"
//               >
//                 Search
//               </button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Browsing Card */}
//         <Card className="shadow-sm border text-center hover:shadow-lg transition-shadow duration-300">
//           <CardContent className="py-6">
//             <h2 className="text-base text-muted-foreground mb-4">
//               Or start browsing by branch
//             </h2>
//             <button
//               onClick={() => setShowBranches(!showBranches)}
//               className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow hover:scale-105 hover:brightness-110 transition-transform duration-300"
//             >
//               Start Browsing
//             </button>
//           </CardContent>
//         </Card>

//         {/* Branch Grid */}
//         {showBranches && (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {branches.length === 0 ? (
//               <p className="text-center text-muted-foreground">
//                 No branches available.
//               </p>
//             ) : (
//               branches.map((branch) => (
//                 <Link key={branch?._id} to={`/student/branch/${branch?._id}/years`}>
//                   <Card className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
//                     <CardHeader className="flex items-center gap-3">
//                       <BookOpen className="h-6 w-6 text-primary" />
//                       <CardTitle className="text-base font-medium">
//                         {branch?.name || "Unnamed Branch"}
//                       </CardTitle>
//                     </CardHeader>
//                   </Card>
//                 </Link>
//               ))
//             )}
//           </div>
//         )}

//         {/* How It Works */}
//         <div className="bg-muted rounded-xl p-6 shadow-inner mt-10">
//           <h3 className="text-lg font-semibold mb-4 text-foreground text-center">
//             How It Works
//           </h3>
//           <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium text-muted-foreground">
//             <span>Branch</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Year</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Subject</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Unit</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Topic</span>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <Video className="w-4 h-4 text-primary" />
//               <span>Videos</span>
//             </div>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <FileText className="w-4 h-4 text-primary" />
//               <span>PDFs</span>
//             </div>
//             <ChevronRight className="w-4 h-4" />
//             <div className="flex items-center gap-2">
//               <ListChecks className="w-4 h-4 text-primary" />
//               <span>Summaries</span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BrowseResources;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight, Video, FileText, ListChecks } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { studentAPI } from "@/api/student";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const BrowseResources = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBranches, setShowBranches] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search resources...");

  const placeholders = ["Search resources...", "Search subjects...", "Search topics..."];
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[i]);
      i = (i + 1) % placeholders.length;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const res = await studentAPI.getBranches();
        const branchList = res?.data || res?.branches || res || [];
        setBranches(Array.isArray(branchList) ? branchList : []);
      } catch (err) {
        console.error(err);
        toast.error(err?.message || err?.response?.data?.error || "Failed to load branches.");
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-background py-10">
      <main className="container mx-auto px-4 space-y-10">
        {/* Search Card */}
        <Card className="shadow-sm border hover:shadow-lg transition-shadow duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              Find Your Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:scale-105 hover:bg-primary/90 transition-transform duration-300"
              >
                Search
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Browsing Card */}
        <Card className="shadow-sm border text-center hover:shadow-lg transition-shadow duration-300 rounded-2xl">
          <CardContent className="py-6">
            <h2 className="text-base text-muted-foreground mb-4">
              Or start browsing by branch
            </h2>
            <button
              onClick={() => setShowBranches(!showBranches)}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow hover:scale-105 hover:brightness-110 transition-transform duration-300"
            >
              Start Browsing
            </button>
          </CardContent>
        </Card>

        {/* Branch Grid */}
        {showBranches && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {branches.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No branches available.
              </p>
            ) : (
              branches.map((branch) => (
                <Link key={branch?._id} to={`/student/branch/${branch?._id}/years`}>
                  <Card className="transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CardHeader className="flex items-center gap-3 p-4">
                      <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-base font-medium text-gray-800 dark:text-gray-100">
                        {branch?.name || "Unnamed Branch"}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}

        {/* How It Works */}
        <div className="bg-muted rounded-xl p-6 shadow-inner mt-10">
          <h3 className="text-lg font-semibold mb-4 text-foreground text-center">
            How It Works
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium text-muted-foreground">
            <span>Branch</span>
            <ChevronRight className="w-4 h-4" />
            <span>Year</span>
            <ChevronRight className="w-4 h-4" />
            <span>Subject</span>
            <ChevronRight className="w-4 h-4" />
            <span>Unit</span>
            <ChevronRight className="w-4 h-4" />
            <span>Topic</span>
            <ChevronRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" />
              <span>Videos</span>
            </div>
            <ChevronRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>PDFs</span>
            </div>
            <ChevronRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-primary" />
              <span>Summaries</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseResources;
