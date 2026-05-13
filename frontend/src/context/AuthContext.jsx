// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'sonner';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check for stored token on mount
//     const token = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
    
//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       const { token, user: userData } = response.data;
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       setUser(userData);
//       toast.success('Login successful!');
      
//       // Redirect based on role
//       if (userData.role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/student/dashboard');
//       }
      
//       return { success: true };
//     } catch (error) {
//       const message = error.response?.data?.message || 'Login failed';
//       toast.error(message);
//       return { success: false, error: message };
//     }
//   };

//   const signup = async (name, email, password, role = 'student') => {
//     try {
//       const response = await axios.post('/api/auth/register', { 
//         name, 
//         email, 
//         password, 
//         role 
//       });
//       const { token, user: userData } = response.data;
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       setUser(userData);
//       toast.success('Registration successful!');
      
//       // Redirect based on role
//       if (userData.role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/student/dashboard');
//       }
      
//       return { success: true };
//     } catch (error) {
//       const message = error.response?.data?.message || 'Registration failed';
//       toast.error(message);
//       return { success: false, error: message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//     toast.success('Logged out successfully');
//     navigate('/login');
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     signup,
//     logout,
//     isAdmin: user?.role === 'admin',
//     isStudent: user?.role === 'student',
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import axiosInstance from '../lib/axios';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Safe parsing of stored user
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
       //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('user'); // clear invalid data
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // const response = await axios.post('/api/auth/login', {
      //   email: email.trim().toLowerCase(),
      //   password: password.trim(),
      // });
       const response = await axiosInstance.post('/api/auth/login', {
  email: email.trim().toLowerCase(),
  password: password.trim(),
}); 

      const data = response.data?.data || response.data;
      const token = data?.token;
      const userData = data?.user;

      if (!token || !userData) throw new Error('Invalid server response');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(userData);
      toast.success('Login successful!');

      navigate(userData.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const signup = async (payload) => {
    try {
      //const response = await axios.post('/api/auth/signup', payload);
      const response = await axiosInstance.post('/api/auth/signup', payload);
      const data = response.data?.data || response.data;
      const token = data?.token;
      const userData = data?.user;

      if (!token || !userData) throw new Error('Invalid server response');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(userData);
      toast.success('Registration successful!');

      navigate(userData.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //delete axios.defaults.headers.common['Authorization'];
      delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/'); // ✅ Redirect to landing page instead of login
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

