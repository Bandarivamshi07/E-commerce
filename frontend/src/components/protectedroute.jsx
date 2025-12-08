import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ✅ Must match the same key used in login.jsx
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚫 If no user found → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in → show the requested page
  return children;
};

export default ProtectedRoute;
