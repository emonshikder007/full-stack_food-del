import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAdminAuthenticated");
  return isAuth === "true" ? children : <Navigate to="/login" />;
};

export default AdminRoute;