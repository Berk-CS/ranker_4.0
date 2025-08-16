'use client';

import { AuthProvider } from 'react-oidc-context';
import oidcConfig from '../oidcConfig';

export default function AuthProviderWrapper({ children }) {
  return (
    <AuthProvider {...oidcConfig}>
      {children}
    </AuthProvider>
  );
}
