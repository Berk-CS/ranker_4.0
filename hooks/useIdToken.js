import { useAuth } from 'react-oidc-context';

export const useIdToken = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated || !auth.user) return null;

  return auth.user.id_token;  // <-- This is your ID token
};