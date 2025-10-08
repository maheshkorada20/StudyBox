// src/components/layout/StudentLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';

const StudentLayout = () => {
  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded hover:bg-primary/10 ${isActive ? 'bg-primary/20 font-semibold' : ''}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-muted p-4 flex flex-col gap-2">
          <NavLink to="/student/dashboard" className={navClass}>
            Student Dashboard
          </NavLink>
          <NavLink to="/student/search" className={navClass}>
            Browse Resources
          </NavLink>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
