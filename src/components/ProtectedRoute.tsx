import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, hydrated } = useAuth();
  const location = useLocation();

  // Wait for auth to hydrate from localStorage to avoid false redirects on refresh
  if (!hydrated) {
    return <div className="p-6 text-sm text-gray-600">Loading…</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
