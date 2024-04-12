import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initialLoadUser } from "../../redux/actions/logActions";
const SemesterCreditRegistration = ({ initialLoadUser }) => {
  useEffect(() => {
    initialLoadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h2>Todo List</h2>
    </div>
  );
};
SemesterCreditRegistration.propTypes = {
  initialLoadUser: PropTypes.func.isRequired,
};

export default connect(null, { initialLoadUser })(SemesterCreditRegistration);
