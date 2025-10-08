
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Link, useNavigate } from 'react-router-dom';
// import { BookOpen, Mail, Lock, User } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { authAPI } from '@/api/auth';

// const Signup = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student');
//   const [gender, setGender] = useState('');
//   const [adminCode, setAdminCode] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       firstName,
//       lastName,
//       email,
//       password,
//       role,
//       gender: gender || undefined,
//       ...(role === 'admin' && { adminCode }),
//     };

//     try {
//       const res = await authAPI.signup(payload);
//       console.log('Signup successful:', res.data);

//       // Redirect to dashboard based on role
//       const redirect = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
//       navigate(redirect);
//     } catch (err) {
//       console.error('Signup failed:', err.response?.data || err);
//       alert(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-1 text-center">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
//             <BookOpen className="h-8 w-8 text-primary-foreground" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
//           <CardDescription>Join StudyBox to start learning</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex gap-2">
//               <div className="space-y-2 flex-1">
//                 <Label htmlFor="firstName">First Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="firstName"
//                     type="text"
//                     placeholder="John"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2 flex-1">
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="lastName"
//                     type="text"
//                     placeholder="Doe"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     required
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
//             </div>

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
//                   minLength={6}
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="role">Role</Label>
//               <Select value={role} onValueChange={setRole}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select your role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="student">Student</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {role === 'admin' && (
//               <div className="space-y-2">
//                 <Label htmlFor="adminCode">Admin Code</Label>
//                 <Input
//                   id="adminCode"
//                   type="password"
//                   placeholder="Enter admin code"
//                   value={adminCode}
//                   onChange={(e) => setAdminCode(e.target.value)}
//                   required
//                 />
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="gender">Gender</Label>
//               <Select value={gender} onValueChange={setGender}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select gender (optional)" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="male">Male</SelectItem>
//                   <SelectItem value="female">Female</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? 'Creating account...' : 'Sign Up'}
//             </Button>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             <span className="text-muted-foreground">Already have an account? </span>
//             <Link to="/login" className="font-medium text-primary hover:underline">
//               Sign in
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Signup;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User } from 'lucide-react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { authAPI } from '@/api/auth';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [gender, setGender] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName,
      lastName,
      email,
      password,
      role,
      gender: gender || undefined,
      ...(role === 'admin' && { adminCode }),
    };

    try {
      const res = await authAPI.signup(payload);
      console.log('Signup successful:', res.data);

      // Redirect to dashboard based on role
      const redirect = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
      navigate(redirect);
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err);
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Continue with ${provider} clicked`);
    // Implement actual social signup logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join StudyBox to start learning</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="flex gap-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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
                  minLength={6}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex gap-4 justify-center">
                {['student', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      role === r
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                        : 'bg-card text-foreground border border-border hover:bg-primary/10'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Code */}
            {role === 'admin' && (
              <div className="space-y-2">
                <Label htmlFor="adminCode">Admin Code</Label>
                <Input
                  id="adminCode"
                  type="password"
                  placeholder="Enter admin code"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Gender Selection */}
            <div className="space-y-2">
              <Label>Gender (optional)</Label>
              <div className="flex gap-4 justify-center">
                {['male', 'female', 'other'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      gender === g
                        ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-lg'
                        : 'bg-card text-foreground border border-border hover:bg-secondary/10'
                    }`}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
           <Button
  type="submit"
  className={`w-full px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-transform duration-300 ${
    loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-gradient-to-r from-primary to-secondary hover:scale-105'
  }`}
  disabled={loading}
>
  {loading ? 'Creating account...' : 'Sign Up'}
</Button>
          </form>

          {/* Social Signup Buttons */}
          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => handleSocialSignup('Google')}
            >
              <FaGoogle className="w-5 h-5" /> Continue with Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => handleSocialSignup('Facebook')}
            >
              <FaFacebookF className="w-5 h-5" /> Continue with Facebook
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
