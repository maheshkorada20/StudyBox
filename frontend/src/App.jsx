

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/common/ProtectedRoute";

// import Index from "./pages/Index";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";

// // Admin pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminBranches from "./pages/admin/AdminBranches";
// import AdminYears from "./pages/admin/AdminYears";
// import AdminSemesters from "./pages/admin/AdminSemesters";
// import AdminSubjects from "./pages/admin/AdminSubjects";
// import AdminUnits from "./pages/admin/AdminUnits";
// import AdminTopics from "./pages/admin/AdminTopics";
// import AdminResources from "./pages/admin/AdminResources";

// // Student pages
// import StudentDashboard from "./pages/student/StudentDashboard";
// import BrowseYears from "./pages/student/BrowseYears";
// import BrowseSemesters from "./pages/student/BrowseSemesters";
// import BrowseSubjects from "./pages/student/BrowseSubjects";
// import BrowseUnits from "./pages/student/BrowseUnits";
// import BrowseTopics from "./pages/student/BrowseTopics";
// import ResourcesList from "./pages/student/ResourcesList";
// import ResourceDetails from "./pages/student/ResourceDetails";
// import SearchResults from "./pages/student/SearchResults";

// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             {/* Public */}
//             <Route path="/" element={<Index />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />

//             {/* Admin */}
//             <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
//             <Route path="/admin/branches" element={<ProtectedRoute requiredRole="admin"><AdminBranches /></ProtectedRoute>} />
//             <Route path="/admin/years" element={<ProtectedRoute requiredRole="admin"><AdminYears /></ProtectedRoute>} />
//             <Route path="/admin/semesters" element={<ProtectedRoute requiredRole="admin"><AdminSemesters /></ProtectedRoute>} />
//             <Route path="/admin/subjects" element={<ProtectedRoute requiredRole="admin"><AdminSubjects /></ProtectedRoute>} />
//             <Route path="/admin/units" element={<ProtectedRoute requiredRole="admin"><AdminUnits /></ProtectedRoute>} />
//             <Route path="/admin/topics" element={<ProtectedRoute requiredRole="admin"><AdminTopics /></ProtectedRoute>} />
//             <Route path="/admin/resources" element={<ProtectedRoute requiredRole="admin"><AdminResources /></ProtectedRoute>} />

//             {/* Student */}
//             <Route path="/student/dashboard" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />

//             {/* Student Hierarchy */}
//             <Route path="/student/branch/:branchId/years" element={<ProtectedRoute requiredRole="student"><BrowseYears /></ProtectedRoute>} />
//             <Route path="/student/year/:yearId/semesters" element={<ProtectedRoute requiredRole="student"><BrowseSemesters /></ProtectedRoute>} />
//             <Route path="/student/semester/:semesterId/subjects" element={<ProtectedRoute requiredRole="student"><BrowseSubjects /></ProtectedRoute>} />
//             <Route path="/student/subject/:subjectId/units" element={<ProtectedRoute requiredRole="student"><BrowseUnits /></ProtectedRoute>} />

            
//             <Route path="/student/subject/:subjectId/topics" element={<ProtectedRoute requiredRole="student"><BrowseTopics /></ProtectedRoute>} />

//             {/* Resources */}
//             <Route path="/student/topic/:topicId/resources" element={<ProtectedRoute requiredRole="student"><ResourcesList /></ProtectedRoute>} />
//             <Route path="/student/resource/:resourceId" element={<ProtectedRoute requiredRole="student"><ResourceDetails /></ProtectedRoute>} />
//             <Route path="/student/search" element={<ProtectedRoute requiredRole="student"><SearchResults /></ProtectedRoute>} />

//             {/* Fallback */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
// // App.jsx
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ThemeProvider } from "./context/ThemeContext";
// import ProtectedRoute from "./components/common/ProtectedRoute";

// // Layouts
// import Layout from "./components/layout/Layout";
// import LandingLayout from "./components/layout/LandingLayout";

// // Pages
// import Index from "./pages/Index";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";

// // Admin pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminBranches from "./pages/admin/AdminBranches";
// import AdminYears from "./pages/admin/AdminYears";
// import AdminSemesters from "./pages/admin/AdminSemesters";
// import AdminSubjects from "./pages/admin/AdminSubjects";
// import AdminUnits from "./pages/admin/AdminUnits";
// import AdminTopics from "./pages/admin/AdminTopics";
// import AdminResources from "./pages/admin/AdminResources";
// import ManageResources from "./pages/admin/ManageResources"; // <-- new page

// // Student pages
// import StudentDashboard from "./pages/student/StudentDashboard";
// import BrowseResources from "./pages/student/BrowseResources";
// import BrowseYears from "./pages/student/BrowseYears";
// import BrowseSemesters from "./pages/student/BrowseSemesters";
// import BrowseSubjects from "./pages/student/BrowseSubjects";
// import BrowseUnits from "./pages/student/BrowseUnits";
// import BrowseTopics from "./pages/student/BrowseTopics";
// import ResourcesList from "./pages/student/ResourcesList";
// import ResourceDetails from "./pages/student/ResourceDetails";
// import SearchResults from "./pages/student/SearchResults";

// // NotFound
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <ThemeProvider>
//         <BrowserRouter>
//           <AuthProvider>
//             <Routes>
//               {/* Public Landing Page */}
//               <Route path="/" element={<LandingLayout><Index /></LandingLayout>} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />

//               {/* Admin pages */}
//               <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
//               <Route path="/admin/branches" element={<ProtectedRoute requiredRole="admin"><Layout><AdminBranches /></Layout></ProtectedRoute>} />
//               <Route path="/admin/years" element={<ProtectedRoute requiredRole="admin"><Layout><AdminYears /></Layout></ProtectedRoute>} />
//               <Route path="/admin/semesters" element={<ProtectedRoute requiredRole="admin"><Layout><AdminSemesters /></Layout></ProtectedRoute>} />
//               <Route path="/admin/subjects" element={<ProtectedRoute requiredRole="admin"><Layout><AdminSubjects /></Layout></ProtectedRoute>} />
//               <Route path="/admin/units" element={<ProtectedRoute requiredRole="admin"><Layout><AdminUnits /></Layout></ProtectedRoute>} />
//               <Route path="/admin/topics" element={<ProtectedRoute requiredRole="admin"><Layout><AdminTopics /></Layout></ProtectedRoute>} />
//               <Route path="/admin/resources" element={<ProtectedRoute requiredRole="admin"><Layout><AdminResources /></Layout></ProtectedRoute>} />
//               <Route path="/admin/manage-resources" element={<ProtectedRoute requiredRole="admin"><Layout><ManageResources /></Layout></ProtectedRoute>} /> {/* <-- new route */}

//               {/* Student pages */}
//               <Route path="/student/dashboard" element={<ProtectedRoute requiredRole="student"><Layout><StudentDashboard /></Layout></ProtectedRoute>} />
//               <Route path="/student/browse-resources" element={<ProtectedRoute requiredRole="student"><Layout><BrowseResources /></Layout></ProtectedRoute>} />
//               <Route path="/student/search" element={<ProtectedRoute requiredRole="student"><Layout><SearchResults /></Layout></ProtectedRoute>} />

//               {/* Student hierarchy routes */}
//               <Route path="/student/branch/:branchId/years" element={<ProtectedRoute requiredRole="student"><Layout><BrowseYears /></Layout></ProtectedRoute>} />
//               <Route path="/student/year/:yearId/semesters" element={<ProtectedRoute requiredRole="student"><Layout><BrowseSemesters /></Layout></ProtectedRoute>} />
//               <Route path="/student/semester/:semesterId/subjects" element={<ProtectedRoute requiredRole="student"><Layout><BrowseSubjects /></Layout></ProtectedRoute>} />
//               <Route path="/student/subject/:subjectId/units" element={<ProtectedRoute requiredRole="student"><Layout><BrowseUnits /></Layout></ProtectedRoute>} />
//               <Route path="/student/subject/:subjectId/topics" element={<ProtectedRoute requiredRole="student"><Layout><BrowseTopics /></Layout></ProtectedRoute>} />
//               <Route path="/student/topic/:topicId/resources" element={<ProtectedRoute requiredRole="student"><Layout><ResourcesList /></Layout></ProtectedRoute>} />
//               <Route path="/student/resource/:resourceId" element={<ProtectedRoute requiredRole="student"><Layout><ResourceDetails /></Layout></ProtectedRoute>} />

//               {/* Fallback */}
//               <Route path="*" element={<LandingLayout><NotFound /></LandingLayout>} />
//             </Routes>
//           </AuthProvider>
//         </BrowserRouter>
//       </ThemeProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

//export default App;

// src/App.jsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Layouts
import Layout from "./components/layout/Layout";
import LandingLayout from "./components/layout/LandingLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBranches from "./pages/admin/AdminBranches";
import AdminYears from "./pages/admin/AdminYears";
import AdminSemesters from "./pages/admin/AdminSemesters";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminUnits from "./pages/admin/AdminUnits";
import AdminTopics from "./pages/admin/AdminTopics";
import AdminResources from "./pages/admin/AdminResources";
import ManageResources from "./pages/admin/ManageResources";
import AdminAllResources from "@/pages/admin/AdminAllResources";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import BrowseResources from "./pages/student/BrowseResources";
import BrowseYears from "./pages/student/BrowseYears";
import BrowseSemesters from "./pages/student/BrowseSemesters";
import BrowseSubjects from "./pages/student/BrowseSubjects";
import BrowseUnits from "./pages/student/BrowseUnits";
import BrowseTopics from "./pages/student/BrowseTopics";
import ResourcesList from "./pages/student/ResourcesList";
import ResourceDetails from "./pages/student/ResourceDetails";
import SearchResults from "./pages/student/SearchResults";

// NotFound
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingLayout><Index /></LandingLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin pages */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminDashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/branches" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminBranches /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/years" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminYears /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/semesters" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminSemesters /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/subjects" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminSubjects /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/units" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminUnits /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/topics" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminTopics /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/resources" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminResources /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/manage-resources" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><ManageResources /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/all-resources" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout><AdminAllResources /></Layout>
                </ProtectedRoute>
              } />

              {/* Student pages */}
              <Route path="/student/dashboard" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><StudentDashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/browse-resources" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><BrowseResources /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/search" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><SearchResults /></Layout>
                </ProtectedRoute>
              } />

              {/* Student hierarchy routes */}
              <Route path="/student/branch/:branchId/years" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><BrowseYears /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/year/:yearId/semesters" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><BrowseSemesters /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/semester/:semesterId/subjects" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><BrowseSubjects /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/subject/:subjectId/units" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><BrowseUnits /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/subject/:subjectId/topics" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><BrowseTopics /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/topic/:topicId/resources" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><ResourcesList /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/student/resource/:resourceId" element={
                <ProtectedRoute requiredRole="student">
                  <Layout><ResourceDetails /></Layout>
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<LandingLayout><NotFound /></LandingLayout>} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
