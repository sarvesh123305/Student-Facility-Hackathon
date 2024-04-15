import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../../layouts/Spinner";
import AuthContext from "../context/auth/authContext";
const PrivateRouteStudentSection = ({ component: Component }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, userType } = authContext;
  if (loading) return <Spinner />;
  // console.log("Is it here", Component);
  if (isAuthenticated && userType === "studentsection") return <Component />;
  return <Navigate to="/StudentSection/login" />;
};

export default PrivateRouteStudentSection;
