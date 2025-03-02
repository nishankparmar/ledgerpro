
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// We're removing the ProtectedRouteProps interface since we'll use Outlet pattern

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can show a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Using Outlet instead of children since we're using the Route element pattern
  return <Outlet />;
};

export default ProtectedRoute;
