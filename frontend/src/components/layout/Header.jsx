
// import { useAuth } from '@/context/AuthContext';
// import { useTheme } from '@/context/ThemeContext';
// import { Button } from '@/components/ui/button';
// import { BookOpen, User, LogOut } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const location = useLocation();

//   // Scroll to section function
//   const handleScroll = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const navLinks = [
//     { name: 'Home', id: 'home' },
//     { name: 'Browse', id: 'browse' },
//     { name: 'Features', id: 'features' },
//     { name: 'About', id: 'about' },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Left: Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary shadow-md">
//               <BookOpen className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <span className="text-xl font-bold text-foreground">StudyBox</span>
//           </Link>

//           {/* Center: Navigation Links */}
//           <nav className="flex items-center gap-6">
//             {navLinks.map((link) => (
//               <button
//                 key={link.name}
//                 onClick={() => handleScroll(link.id)}
//                 className="text-foreground transition-colors duration-300 hover:text-primary font-medium"
//               >
//                 {link.name}
//               </button>
//             ))}
//           </nav>

//           {/* Right: Dark mode + Auth */}
//           <div className="flex items-center gap-3">
//             {/* Unique Dark Mode Toggle */}
//             <div
//               onClick={toggleTheme}
//               className="relative w-12 h-6 rounded-full cursor-pointer bg-gradient-to-r from-primary/30 to-secondary/30 dark:from-gray-600 dark:to-gray-800 shadow-inner flex items-center px-1 transition-colors duration-500"
//             >
//               <div
//                 className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md transform transition-transform duration-300 flex items-center justify-center text-sm ${
//                   theme === 'dark' ? 'translate-x-6 rotate-45' : ''
//                 }`}
//               >
//                 {theme === 'dark' ? '🌙' : '☀️'}
//               </div>
//             </div>

//             {/* Auth Section */}
//             {user ? (
//               <div className="flex items-center gap-2 text-sm">
//                 <User className="h-4 w-4 text-muted-foreground" />
//                 <span className="font-medium text-foreground">{user.name}</span>
//                 <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
//                   {user.role}
//                 </span>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={logout}
//                   className="px-3 py-1 text-sm rounded-full"
//                 >
//                   <LogOut className="mr-1 h-4 w-4" />
//                   Logout
//                 </Button>
//               </div>
//             ) : (
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
//                 >
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:scale-105 transition-transform duration-300"
//                 >
//                   <Link to="/signup">Sign Up</Link>
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
// import { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { useTheme } from '@/context/ThemeContext';
// import { Button } from '@/components/ui/button';
// import { BookOpen, User, LogOut, Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const navLinks = [
//     { name: 'Home', id: 'home' },
//     { name: 'Browse', id: 'browse' },
//     { name: 'Features', id: 'features' },
//     { name: 'About', id: 'about' },
//   ];

//   const handleScroll = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//       setMobileOpen(false); // close mobile menu after click
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary shadow-md">
//               <BookOpen className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <span className="text-xl font-bold text-foreground">StudyBox</span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-6">
//             {navLinks.map((link) => (
//               <button
//                 key={link.name}
//                 onClick={() => handleScroll(link.id)}
//                 className="text-foreground transition-colors duration-300 hover:text-primary font-medium"
//               >
//                 {link.name}
//               </button>
//             ))}
//           </nav>

//           {/* Right section */}
//           <div className="flex items-center gap-3">
//             {/* Dark Mode Toggle */}
//             <div
//               onClick={toggleTheme}
//               className="relative w-12 h-6 rounded-full cursor-pointer bg-gradient-to-r from-primary/30 to-secondary/30 dark:from-gray-600 dark:to-gray-800 shadow-inner flex items-center px-1 transition-colors duration-500"
//             >
//               <div
//                 className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md transform transition-transform duration-300 flex items-center justify-center text-sm ${
//                   theme === 'dark' ? 'translate-x-6 rotate-45' : ''
//                 }`}
//               >
//                 {theme === 'dark' ? '🌙' : '☀️'}
//               </div>
//             </div>

//             {/* Auth Buttons */}
//             {user ? (
//               <div className="hidden md:flex items-center gap-2 text-sm">
//                 <User className="h-4 w-4 text-muted-foreground" />
//                 <span className="font-medium text-foreground">{user.name}</span>
//                 <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
//                   {user.role}
//                 </span>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={logout}
//                   className="px-3 py-1 text-sm rounded-full"
//                 >
//                   <LogOut className="mr-1 h-4 w-4" />
//                   Logout
//                 </Button>
//               </div>
//             ) : (
//               <div className="hidden md:flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
//                 >
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:scale-105 transition-transform duration-300"
//                 >
//                   <Link to="/signup">Sign Up</Link>
//                 </Button>
//               </div>
//             )}

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden p-2 rounded-md hover:bg-primary/10 transition-colors"
//               onClick={() => setMobileOpen(!mobileOpen)}
//             >
//               {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         {mobileOpen && (
//           <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-border">
//             {navLinks.map((link) => (
//               <button
//                 key={link.name}
//                 onClick={() => handleScroll(link.id)}
//                 className="text-foreground transition-colors duration-300 hover:text-primary font-medium text-left"
//               >
//                 {link.name}
//               </button>
//             ))}
//             {!user && (
//               <div className="flex flex-col gap-2 mt-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
//                 >
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:scale-105 transition-transform duration-300"
//                 >
//                   <Link to="/signup">Sign Up</Link>
//                 </Button>
//               </div>
//             )}
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

// //correct for student 
// /// src/components/layout/Header.jsx
// import { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { useTheme } from '@/context/ThemeContext';
// import { Button } from '@/components/ui/button';
// import { BookOpen, LogOut, Menu, X, Bell, User } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const location = useLocation();
//   const isLandingPage = location.pathname === '/';

//   // Nav links based on user and role
//   const navLinks = user
//     ? user.role === 'admin'
//       ? [
//           { name: 'Dashboard', path: '/admin/dashboard' },
//           { name: 'Branches', path: '/admin/branches' },
//           { name: 'Years', path: '/admin/years' },
//         ]
//       : [
//           { name: 'Student Dashboard', path: '/student/dashboard' },
//           { name: 'Browse Resources', path: '/student/browse-resources' },
//         ]
//     : [
//         { name: 'Home', id: 'home' },
//         { name: 'Browse', id: 'browse' },
//         { name: 'Features', id: 'features' },
//         { name: 'About', id: 'about' },
//       ];

//   const handleScroll = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary shadow-md">
//               <BookOpen className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <span className="text-xl font-bold text-foreground">StudyBox</span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav
//             className={`hidden md:flex items-center gap-6 ${
//               isLandingPage ? 'mx-auto justify-center flex-1' : ''
//             }`}
//           >
//             {navLinks.map((link) =>
//               link.path ? (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="text-foreground transition-colors duration-300 hover:text-primary font-medium"
//                 >
//                   {link.name}
//                 </Link>
//               ) : (
//                 <button
//                   key={link.name}
//                   onClick={() => handleScroll(link.id)}
//                   className="text-foreground transition-colors duration-300 hover:text-primary font-medium"
//                 >
//                   {link.name}
//                 </button>
//               )
//             )}
//           </nav>

//           {/* Right Section */}
//           <div className="flex items-center gap-3">
//             {/* Dark Mode Toggle */}
//             <div
//               onClick={toggleTheme}
//               className="relative w-12 h-6 rounded-full cursor-pointer bg-gradient-to-r from-primary/30 to-secondary/30 dark:from-gray-600 dark:to-gray-800 shadow-inner flex items-center px-1 transition-colors duration-500"
//             >
//               <div
//                 className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md transform transition-transform duration-300 flex items-center justify-center text-sm ${
//                   theme === 'dark' ? 'translate-x-6 rotate-45' : ''
//                 }`}
//               >
//                 {theme === 'dark' ? '🌙' : '☀️'}
//               </div>
//             </div>

//             {/* Auth Buttons or Profile */}
//             {user ? (
//               !isLandingPage && (
//                 <div className="relative">
//                   <button
//                     onClick={() => setProfileOpen(!profileOpen)}
//                     className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow hover:shadow-lg transition-shadow duration-300"
//                   >
//                     <User className="h-5 w-5 text-white" />
//                   </button>
//                   {profileOpen && (
//                     <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
//                       {/* Avatar */}
//                       <div className="flex justify-center mt-4">
//                         <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
//                           <User className="h-8 w-8 text-white" />
//                         </div>
//                       </div>
//                       {/* User Info */}
//                       <div className="p-4 text-center">
//                         <p className="font-semibold text-foreground text-lg">{user.name}</p>
//                         <p className="text-xs text-muted-foreground mb-1">{user.email}</p>
//                         <span className="inline-block bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full">
//                           {user.role}
//                         </span>
//                       </div>
//                       {/* Logout Button */}
//                       <Button
//                         variant="gradient"
//                         size="sm"
//                         onClick={logout}
//                         className="w-full rounded-b-xl flex items-center justify-center gap-2 px-3 py-2 text-sm mt-2"
//                       >
//                         <LogOut className="h-4 w-4" /> Logout
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               )
//             ) : (
//               // Public landing page auth buttons
//               <div className="hidden md:flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
//                 >
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button
//                   size="sm"
//                   asChild
//                   className="px-4 py-1 text-sm rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:scale-105 transition-transform duration-300"
//                 >
//                   <Link to="/signup">Sign Up</Link>
//                 </Button>
//               </div>
//             )}

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden p-2 rounded-md hover:bg-primary/10 transition-colors"
//               onClick={() => setMobileOpen(!mobileOpen)}
//             >
//               {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         {mobileOpen && (
//           <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-border">
//             {navLinks.map((link) =>
//               link.path ? (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="text-foreground transition-colors duration-300 hover:text-primary font-medium text-left"
//                   onClick={() => setMobileOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ) : (
//                 <button
//                   key={link.name}
//                   onClick={() => handleScroll(link.id)}
//                   className="text-foreground transition-colors duration-300 hover:text-primary font-medium text-left"
//                 >
//                   {link.name}
//                 </button>
//               )
//             )}

//             {/* Mobile Auth Buttons */}
//             {!user ? (
//               <div className="flex flex-col gap-2 mt-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   asChild
//                   className="px-4 py-2 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
//                 >
//                   <Link to="/login" onClick={() => setMobileOpen(false)}>
//                     Login
//                   </Link>
//                 </Button>
//                 <Button
//                   size="sm"
//                   asChild
//                   className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:scale-105 transition-transform duration-300"
//                 >
//                   <Link to="/signup" onClick={() => setMobileOpen(false)}>
//                     Sign Up
//                   </Link>
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={logout}
//                 className="px-3 py-1 text-sm rounded-full mt-2"
//               >
//                 <LogOut className="mr-1 h-4 w-4" /> Logout
//               </Button>
//             )}
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;


// src/components/layout/Header.jsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { BookOpen, LogOut, Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Admin navigation links (only three)
  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Resources', path: '/admin/manage-resources' },
    { name: 'All Resources', path: '/admin/resources' },
  ];

  // Student navigation links
  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard' },
    { name: 'Browse Resources', path: '/student/browse-resources' },
  ];

  // Public navigation
  const publicLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Browse', id: 'browse' },
    { name: 'Features', id: 'features' },
    { name: 'About', id: 'about' },
  ];

  const navLinks = user
    ? user.role === 'admin'
      ? adminLinks
      : studentLinks
    : publicLinks;

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary shadow-md">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StudyBox</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-6 ${isLandingPage ? 'mx-auto justify-center flex-1' : ''}`}>
            {navLinks.map((link) =>
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-foreground transition-colors duration-300 hover:text-primary font-medium"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.id)}
                  className="text-foreground transition-colors duration-300 hover:text-primary font-medium"
                >
                  {link.name}
                </button>
              )
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <div
              onClick={toggleTheme}
              className="relative w-12 h-6 rounded-full cursor-pointer bg-gradient-to-r from-primary/30 to-secondary/30 dark:from-gray-600 dark:to-gray-800 shadow-inner flex items-center px-1 transition-colors duration-500"
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md transform transition-transform duration-300 flex items-center justify-center text-sm ${theme === 'dark' ? 'translate-x-6 rotate-45' : ''}`}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </div>
            </div>

            {/* Auth Buttons or Profile */}
            {user ? (
              !isLandingPage && (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    <User className="h-5 w-5 text-white" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                      {/* Avatar */}
                      <div className="flex justify-center mt-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
                          <User className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      {/* User Info */}
                      <div className="p-4 text-center">
                        <p className="font-semibold text-foreground text-lg">{user.name}</p>
                        <p className="text-xs text-muted-foreground mb-1">{user.email}</p>
                        <span className="inline-block bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full">
                          {user.role}
                        </span>
                      </div>
                      {/* Logout Button */}
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={logout}
                        className="w-full rounded-b-xl flex items-center justify-center gap-2 px-3 py-2 text-sm mt-2"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </Button>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="hidden md:flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="px-4 py-1 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="px-4 py-1 text-sm rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:scale-105 transition-transform duration-300"
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-primary/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-border">
            {navLinks.map((link) =>
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-foreground transition-colors duration-300 hover:text-primary font-medium text-left"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.id)}
                  className="text-foreground transition-colors duration-300 hover:text-primary font-medium text-left"
                >
                  {link.name}
                </button>
              )
            )}

            {!user ? (
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="px-4 py-2 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:scale-105 transition-transform duration-300"
                >
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="px-3 py-1 text-sm rounded-full mt-2"
              >
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
