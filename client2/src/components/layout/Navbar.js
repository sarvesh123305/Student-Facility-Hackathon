import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return <div></div>;
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "MIS Portal",
  icon: "fas fa-id-card-alt",
};
export default Navbar;
/*

   <div className="" style={{ display: "flex", flexDirection: "row" }}>
      <h1>Sarvesh ANant Kulkarni</h1>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <h1 className="text-6xl text-red-500 bg-purple-200">Helllo talwind</h1>
      <ul></ul>
    </div>
*/
