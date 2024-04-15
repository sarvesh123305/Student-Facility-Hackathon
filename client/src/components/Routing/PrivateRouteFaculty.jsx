import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import Spinner from "../../components/layout/Spinner";
import AuthContext from "../context/auth/authContext";
const PrivateRouteFaculty = ({ component: Component }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, userType } = authContext;
  //  if (loading) return <Spinner />;
  console.log("Is it here", Component);
  if (isAuthenticated && userType === "faculty") return <Component />;
  return <Navigate to="/Faculty/login" />;
};

export default PrivateRouteFaculty;
