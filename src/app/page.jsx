// app/page.jsx
'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from 'react-oidc-context';
import LandingPage from '../../components/LandingPage';

const LandingPageWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();

  useEffect(() => {
    const hasAuthCode = searchParams.toString().includes('code=');

    if (auth.isAuthenticated && hasAuthCode) {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/app';
      sessionStorage.removeItem('redirectAfterLogin');
      router.replace(redirectPath);
    }
  }, [auth.isAuthenticated, searchParams, router]);

  const handleNavigateToApp = () => {
    router.push('/app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <LandingPage onNavigateToApp={handleNavigateToApp} />;
};

export default LandingPageWrapper;
