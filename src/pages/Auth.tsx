
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true') {
      if (userRole === 'developer') {
        navigate('/developer/dashboard');
      } else if (userRole === 'recycler') {
        navigate('/recycler/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-green-500 to-blue-500 h-12 w-12 rounded-md mb-3"></div>
          <h1 className="text-3xl font-bold mb-2">Trace Platform</h1>
          <p className="text-gray-500">Sustainability Compliance Management</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
