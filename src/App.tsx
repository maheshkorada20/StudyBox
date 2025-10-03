import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBranches from "./pages/admin/AdminBranches";
import AdminYears from "./pages/admin/AdminYears";
import AdminSemesters from "./pages/admin/AdminSemesters";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminUnits from "./pages/admin/AdminUnits";
import AdminTopics from "./pages/admin/AdminTopics";
import AdminResources from "./pages/admin/AdminResources";
import StudentDashboard from "./pages/student/StudentDashboard";
import BrowseYears from "./pages/student/BrowseYears";
import BrowseSemesters from "./pages/student/BrowseSemesters";
import BrowseSubjects from "./pages/student/BrowseSubjects";
import BrowseUnits from "./pages/student/BrowseUnits";
import BrowseTopics from "./pages/student/BrowseTopics";
import ResourcesList from "./pages/student/ResourcesList";
import ResourceDetails from "./pages/student/ResourceDetails";
import SearchResults from "./pages/student/SearchResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/branches" element={<ProtectedRoute requiredRole="admin"><AdminBranches /></ProtectedRoute>} />
            <Route path="/admin/years" element={<ProtectedRoute requiredRole="admin"><AdminYears /></ProtectedRoute>} />
            <Route path="/admin/semesters" element={<ProtectedRoute requiredRole="admin"><AdminSemesters /></ProtectedRoute>} />
            <Route path="/admin/subjects" element={<ProtectedRoute requiredRole="admin"><AdminSubjects /></ProtectedRoute>} />
            <Route path="/admin/units" element={<ProtectedRoute requiredRole="admin"><AdminUnits /></ProtectedRoute>} />
            <Route path="/admin/topics" element={<ProtectedRoute requiredRole="admin"><AdminTopics /></ProtectedRoute>} />
            <Route path="/admin/resources" element={<ProtectedRoute requiredRole="admin"><AdminResources /></ProtectedRoute>} />
            
            <Route path="/student/dashboard" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/branch/:branchId" element={<ProtectedRoute requiredRole="student"><BrowseYears /></ProtectedRoute>} />
            <Route path="/student/year/:yearId/semesters" element={<ProtectedRoute requiredRole="student"><BrowseSemesters /></ProtectedRoute>} />
            <Route path="/student/semester/:semesterId/subjects" element={<ProtectedRoute requiredRole="student"><BrowseSubjects /></ProtectedRoute>} />
            <Route path="/student/subject/:subjectId/units" element={<ProtectedRoute requiredRole="student"><BrowseUnits /></ProtectedRoute>} />
            <Route path="/student/unit/:unitId/topics" element={<ProtectedRoute requiredRole="student"><BrowseTopics /></ProtectedRoute>} />
            <Route path="/student/topic/:topicId/resources" element={<ProtectedRoute requiredRole="student"><ResourcesList /></ProtectedRoute>} />
            <Route path="/student/resource/:resourceId" element={<ProtectedRoute requiredRole="student"><ResourceDetails /></ProtectedRoute>} />
            <Route path="/student/search" element={<ProtectedRoute requiredRole="student"><SearchResults /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
