// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { BookOpen, Search } from 'lucide-react';
// import Header from '@/components/layout/Header';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please login first!');
//       navigate('/login');
//       return;
//     }
//     fetchBranches();
//   }, []);

//   const fetchBranches = async () => {
//     setLoading(true);
//     try {
//       const branchArray = await studentAPI.getBranches();
//       console.log('Branches loaded:', branchArray);
//       if (!branchArray || branchArray.length === 0) {
//         toast.error('No branches found!');
//       }
//       setBranches(branchArray);
//     } catch (err) {
//       console.error('Error loading branches:', err);
//       toast.error(err.message || 'Failed to load branches.');
//       setBranches([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/student/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
//           <p className="mt-2 text-muted-foreground">Browse and access your study materials</p>
//         </div>

//         {/* Search */}
//         <Card className="mb-8">
//           <CardContent className="pt-6">
//             <form onSubmit={handleSearch} className="flex gap-2">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="text"
//                   placeholder="Search for resources, topics, subjects..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Branches */}
//         <div>
//           <h2 className="mb-4 text-2xl font-semibold text-foreground">Browse by Branch</h2>
//           {loading ? (
//             <LoadingSpinner />
//           ) : branches.length === 0 ? (
//             <p className="text-muted-foreground">No branches found.</p>
//           ) : (
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {branches.map((branch) => (
//                 <Link
//                   key={branch._id}
//                   to={`/student/branch/${branch._id}/years`}
//                   className="w-full"
//                 >
//                   <Card className="transition-all hover:shadow-lg cursor-pointer">
//                     <CardHeader>
//                       <div className="flex items-center gap-3">
//                         <div className="rounded-lg bg-primary/10 p-3">
//                           <BookOpen className="h-6 w-6 text-primary" />
//                         </div>
//                         <div className="flex-1">
//                           <CardTitle>{branch.name}</CardTitle>
//                           {branch.code && <CardDescription>{branch.code}</CardDescription>}
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       {branch.description && (
//                         <p className="mb-4 text-sm text-muted-foreground">{branch.description}</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;

//correct code 
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { BookOpen, Video, FileText, ListChecks } from 'lucide-react';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { studentAPI } from '@/api/student';
// import { toast } from 'sonner';
// import { Input } from '@/components/ui/input';
// import { useAuth } from '@/context/AuthContext';

// const StudentDashboard = () => {
// const navigate = useNavigate();
// const { user } = useAuth();
// const [recentResources, setRecentResources] = useState([]);
// const [recentlyViewed, setRecentlyViewed] = useState([]);
// const [favorites, setFavorites] = useState([]);
// const [branches, setBranches] = useState([]);
// const [loading, setLoading] = useState(true);
// const [showBranches, setShowBranches] = useState(false);
// const [searchQuery, setSearchQuery] = useState('');
// const [placeholderText, setPlaceholderText] = useState('Search for resources, topics, subjects...');

// useEffect(() => {
// const token = localStorage.getItem('token');
// if (!token) {
// toast.error('Please login first!');
// navigate('/login');
// return;
// }


// const fetchDashboardData = async () => {
//   setLoading(true);
//   try {
//     const recent = await studentAPI.getRecentResources();
//     setRecentResources(recent?.slice(0, 3) || []); // limit to 3
//     const viewed = await studentAPI.getRecentlyViewed();
//     setRecentlyViewed(viewed || []);
//     const favs = await studentAPI.getFavorites();
//     setFavorites(favs || []);
//     const branchList = await studentAPI.getBranches();
//     setBranches(branchList || []);
//   } catch (err) {
//     toast.error(err.message || 'Failed to load dashboard.');
//   } finally {
//     setLoading(false);
//   }
// };

// fetchDashboardData();


// }, [navigate]);

// // Marquee-like placeholder
// useEffect(() => {
// let i = 0;
// const text = 'Search for resources, topics, subjects...   ';
// const interval = setInterval(() => {
// setPlaceholderText(text.substring(i) + text.substring(0, i));
// i = (i + 1) % text.length;
// }, 300);
// return () => clearInterval(interval);
// }, []);

// const handleSearch = (e) => {
// e.preventDefault();
// if (searchQuery.trim()) {
// navigate(`/student/search?q=${encodeURIComponent(searchQuery)}`);
// }
// };

// if (loading) return <LoadingSpinner />;

// // Compact resource card (used for all 3 sections)
// const renderCompactResourceCard = (res) => (
// <Link key={res._id} to={`/student/resource/${res._id}`}> <Card className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer p-4 flex justify-between items-center"> <CardTitle className="text-base font-medium">{res.title}</CardTitle> <div className="flex gap-3">
// {res.youtubeLinks?.length > 0 && <Video className="w-5 h-5 text-red-600" />}
// {res.pdfs?.length > 0 && <FileText className="w-5 h-5 text-blue-600" />}
// {res.summary && <ListChecks className="w-5 h-5 text-green-600" />} </div> </Card> </Link>
// );

// return ( <div className="min-h-screen bg-background"> <main className="container mx-auto px-4 py-8 space-y-8">
// {user && ( <div className="mb-6"> <h1 className="text-3xl font-bold text-foreground">Welcome, {user.name} 👋</h1> <p className="text-muted-foreground">Here’s your learning activity and resources</p> </div>
// )}

// ```
//     {/* Search Bar and Branches */}
//     <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
//       <CardContent className="pt-6">
//         <form onSubmit={handleSearch} className="flex gap-2">
//           <div className="relative flex-1">
//             <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="text"
//               placeholder={placeholderText}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
//             />
//           </div>
//           <button type="submit" className="px-4 py-1 rounded bg-primary text-white hover:scale-105 hover:bg-primary/90 transition-transform duration-300">
//             Search
//           </button>
//         </form>

//         <div className="mt-4">
//           <button
//             onClick={() => setShowBranches(!showBranches)}
//             className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow hover:scale-105 hover:brightness-110 transition-transform duration-300"
//           >
//             Browse by Branch
//           </button>
//         </div>

//         {showBranches && (
//           <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {branches.length === 0 ? (
//               <p className="text-muted-foreground">No branches found.</p>
//             ) : (
//               branches.map((branch) => (
//                 <Link key={branch._id} to={`/student/branch/${branch._id}/years`}>
//                   <Card className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
//                     <CardHeader className="flex items-center gap-3">
//                       <BookOpen className="h-6 w-6 text-primary" />
//                       <CardTitle>{branch.name}</CardTitle>
//                     </CardHeader>
//                   </Card>
//                 </Link>
//               ))
//             )}
//           </div>
//         )}
//       </CardContent>
//     </Card>

//     {/* Recently Added Resources */}
//     <section>
//       <h2 className="text-2xl font-semibold text-foreground mb-4">Recently Added Resources</h2>
//       {recentResources.length === 0 ? (
//         <p className="text-muted-foreground">No new resources available.</p>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {recentResources.map(renderCompactResourceCard)}
//         </div>
//       )}
//     </section>

//     {/* Recently Viewed */}
//     <section>
//       <h2 className="text-2xl font-semibold text-foreground mb-4">Recently Viewed</h2>
//       {recentlyViewed.length === 0 ? (
//         <p className="text-muted-foreground">You haven't viewed any resources yet.</p>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {recentlyViewed.map(renderCompactResourceCard)}
//         </div>
//       )}
//     </section>

//     {/* Favorites */}
//     <section>
//       <h2 className="text-2xl font-semibold text-foreground mb-4">Favorites</h2>
//       {favorites.length === 0 ? (
//         <p className="text-muted-foreground">No favorite resources yet.</p>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {favorites.map(renderCompactResourceCard)}
//         </div>
//       )}
//     </section>
//   </main>
// </div>

// );
// };

// export default StudentDashboard;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText, ListChecks } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { studentAPI } from "@/api/student";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentResources, setRecentResources] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBranches, setShowBranches] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Search for resources, topics, subjects...");

  // Fetch dashboard data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const recent = await studentAPI.getRecentResources();
        setRecentResources(recent?.slice(0, 3) || []);
        const viewed = await studentAPI.getRecentlyViewed();
        setRecentlyViewed(viewed || []);
        const favs = await studentAPI.getFavorites();
        setFavorites(favs || []);
        const branchList = await studentAPI.getBranches();
        setBranches(branchList || []);
      } catch (err) {
        toast.error(err.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Marquee-like placeholder
  useEffect(() => {
    let i = 0;
    const text = "Search for resources, topics, subjects...   ";
    const interval = setInterval(() => {
      setPlaceholderText(text.substring(i) + text.substring(0, i));
      i = (i + 1) % text.length;
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  const renderCompactResourceCard = (res) => (
    <Link key={res._id} to={`/student/resource/${res._id}`}>
      <Card className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer p-4 flex justify-between items-center rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardTitle className="text-base font-medium text-gray-800 dark:text-gray-100">{res.title}</CardTitle>
        <div className="flex gap-3">
          {res.youtubeLinks?.length > 0 && <Video className="w-5 h-5 text-red-600" />}
          {res.pdfs?.length > 0 && <FileText className="w-5 h-5 text-blue-600" />}
          {res.summary && <ListChecks className="w-5 h-5 text-green-600" />}
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 space-y-8">
        {user && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Welcome, {user.name} 👋</h1>
            <p className="text-muted-foreground">Here’s your learning activity and resources</p>
          </div>
        )}

        {/* Search & Branches */}
        <Card className="mb-4 hover:shadow-lg transition-shadow duration-300 rounded-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={placeholderText}
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

            <div className="mt-4">
              <button
                onClick={() => setShowBranches(!showBranches)}
                className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow hover:scale-105 hover:brightness-110 transition-transform duration-300"
              >
                Browse by Branch
              </button>
            </div>

            {showBranches && (
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {branches.length === 0 ? (
                  <p className="text-muted-foreground">No branches found.</p>
                ) : (
                  branches.map((branch) => (
                    <Link key={branch._id} to={`/student/branch/${branch._id}/years`}>
                      <Card className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardHeader className="flex items-center gap-3 p-4">
                          <div className="flex items-center justify-center rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20">
                            <BookOpen className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-base font-medium text-gray-800 dark:text-gray-100">{branch.name}</CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sections */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Recently Added Resources</h2>
          {recentResources.length === 0 ? (
            <p className="text-muted-foreground">No new resources available.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentResources.map(renderCompactResourceCard)}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Recently Viewed</h2>
          {recentlyViewed.length === 0 ? (
            <p className="text-muted-foreground">You haven't viewed any resources yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentlyViewed.map(renderCompactResourceCard)}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Favorites</h2>
          {favorites.length === 0 ? (
            <p className="text-muted-foreground">No favorite resources yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map(renderCompactResourceCard)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;


