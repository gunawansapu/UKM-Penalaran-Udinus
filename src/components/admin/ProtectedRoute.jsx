// src/components/admin/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Arahkan ke halaman login kalau belum masuk
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}