import React from 'react';
import { useAuth } from 'react-oidc-context';

const AuthHeader = () => {
  const auth = useAuth();

  if (auth.isLoading) return null;

  if (auth.error) {
    console.error('Authentication error:', auth.error);
    return <div className="text-red-600">Authentication error: {auth.error.message}</div>;
  }

  const handleLogout = async () => {
    await auth.removeUser(); // clear user state before redirect
  
    const clientId = '6e5l0db9dc66lr0uoc54ehpij3';
    const logoutUri = 'https://intentional-dating.com/';
    const cognitoDomain = 'https://us-east-19ngegjonk.auth.us-east-1.amazoncognito.com';
  
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  
  return (
    <div className="flex justify-end items-center mb-4">
      {auth.isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            👤 {auth.user?.profile?.email || 'User'}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Log Out
          </button>
        </div>
      ) : (
        <button
        onClick={() => {
          sessionStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
          auth.signinRedirect({ extraQueryParams: { prompt: 'login' } });
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
          Sign in
        </button>
      )}
    </div>
  );
};

export default AuthHeader;
