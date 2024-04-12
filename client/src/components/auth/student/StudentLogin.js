import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AlertContext from "../../../context/alert/alertContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth/authContext";
const StudentLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    mis: "",
    password: "",
  });

  const { mis, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (mis === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        mis,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="mis">MIS No</label>
          <input
            id="mis"
            type="text"
            name="mis"
            value={mis}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default StudentLogin;
