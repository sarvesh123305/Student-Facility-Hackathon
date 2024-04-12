import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  mis: "",
  totalCreditsEarned: "",
  totalCurrentCredits: "",
  password: "",
  password2: "",
};
// import { Redirect } from "react-router-dom";

const StudentRegister = (props) => {
  const [user, setUser] = useState(initialState);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const { setAlert } = alertContext;
  const {
    name,
    mis,
    totalCreditsEarned,
    totalCurrentCredits,
    password,
    password2,
  } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      mis === "" ||
      password === "" ||
      totalCurrentCredits === "" ||
      totalCreditsEarned === ""
    )
      setAlert("Please enter all the fields", "danger");
    else if (password !== password2) setAlert("Passwords dont match", "danger");
    else
      register({
        name,
        mis,
        password,
        totalCreditsEarned,
        totalCurrentCredits,
      });
    // console.log("Register a user");
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mis">MIS</label>
          <input
            id="mis"
            type="text"
            name="mis"
            value={mis}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalCreditsEarned">Total Credits Earned</label>
          <input
            id="totalCreditsEarned"
            type="text"
            name="totalCreditsEarned"
            value={totalCreditsEarned}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalCurrentCredits">Total Current Credits</label>
          <input
            id="totalCurrentCredits"
            type="text"
            name="totalCurrentCredits"
            value={totalCurrentCredits}
            onChange={onChange}
            required
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
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default StudentRegister;
