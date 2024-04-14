import React, { useContext, useEffect } from "react";
import Navbar from "./sidebar/Navbar";
import Sidebar from "./sidebar";
import Alerts from "./Alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initialLoadUser } from "../redux/actions/logActions";
import AuthContext from "../components/context/auth/authContext";

const Layout = ({ children, showSidebarAndNavbar, initialLoadUser }) => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    initialLoadUser();
  }, []);
  return (
    <div className="flex h-screen">
      {showSidebarAndNavbar && <Sidebar className="fixed h-full" />}
      <div className="flex-col w-full bg-white overflow-y-auto">
        <Alerts />
        {showSidebarAndNavbar && <Navbar />}
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  initialLoadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { initialLoadUser })(Layout);
