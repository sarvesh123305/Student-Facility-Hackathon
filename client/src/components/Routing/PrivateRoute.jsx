import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import Spinner from "../../components/layout/Spinner";
import AuthContext from "../context/auth/authContext";
const PrivateRoute = ({ component: Component }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  //  if (loading) return <Spinner />;
  console.log("Is it here", Component);
  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
