
// import { useState, useEffect } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Link, useNavigate } from 'react-router-dom';
// import { BookOpen, Mail, Lock } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       // Redirect based on role
//       navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const result = await login(email, password);

//     if (result.success) {
//       // Redirect handled in AuthContext already
//     } else {
//       console.error('Login failed:', result.error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-1 text-center">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
//             <BookOpen className="h-8 w-8 text-primary-foreground" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
//           <CardDescription>Sign in to access your StudyBox account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? 'Signing in...' : 'Sign In'}
//             </Button>
//           </form>
//           <div className="mt-6 text-center text-sm">
//             <span className="text-muted-foreground">Don't have an account? </span>
//             <Link to="/signup" className="font-medium text-primary hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock } from 'lucide-react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa'; // Added react-icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on role
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      console.error('Login failed:', result.error);
    }

    setLoading(false);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Continue with ${provider} clicked`);
    // Implement actual social login logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your StudyBox account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
<Button
  type="submit"
  className={`w-full px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-transform duration-300 ${
    loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-gradient-to-r from-primary to-secondary hover:scale-105'
  }`}
  disabled={loading}
>
  {loading ? 'Signing in...' : 'Sign In'}
</Button>

          </form>

          {/* Social Login Buttons */}
          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle className="w-5 h-5" /> Continue with Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <FaFacebookF className="w-5 h-5" /> Continue with Facebook
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
