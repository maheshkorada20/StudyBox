

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentDashboard from '@/pages/student/StudentDashboard';
import BrowseYears from '@/pages/student/BrowseYears';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/branch/:branchId/years" element={<BrowseYears />} />
        {/* Add more student routes here, like semesters, subjects, etc. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
