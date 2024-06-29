import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext"

export default function ProtectedRoute() {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}