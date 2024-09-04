import React from "react";
import { useAuth } from "../../AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to={"/"} />;
};

export default ProtectedRoute;
