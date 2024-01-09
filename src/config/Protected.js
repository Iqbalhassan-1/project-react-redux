import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate,useLocation } from "react-router-dom";

const Protected = ({ allowedRoles, Component }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (user) {
    if (allowedRoles.includes(user.user_type)) {
      return <Component />;
    }

    // Redirect to unauthorized page if the user's role is not allowed
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Redirect to login page if user is not logged in
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default Protected;
