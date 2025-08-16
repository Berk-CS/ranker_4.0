import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthRedirectCleaner = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If authenticated and currently at root or callback-style path, redirect to /app
    const isCallbackUrl = location.search.includes('code=') && location.pathname === '/';
    
    if (auth.isAuthenticated && isCallbackUrl) {
      navigate('/app', { replace: true });
    }
  }, [auth.isAuthenticated, location, navigate]);

  return null;
};

export default AuthRedirectCleaner;
