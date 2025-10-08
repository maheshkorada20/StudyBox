// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
//           <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but doesn’t have correct role → redirect home
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Otherwise → render the protected content
  return children;
};

export default ProtectedRoute;

