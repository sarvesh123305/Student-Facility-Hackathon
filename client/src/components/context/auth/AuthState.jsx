import React, { useReducer, useContext } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS_STUDENT,
  LOGIN_SUCCESS_FACULTY,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_SUCCESS_STUDENTSECTION,
} from "../types";
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    userType: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User
  const loadUser = async (userType) => {
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }
    console.log("User in auth", userType);
    try {
      console.log("The data iwas ");

      const res = await axios.get("/api/auth/user");
      const data = {
        ...res.data,
      };
      console.log("DATA IS ", data);
      dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } catch (err) {
      console.log("Some error in API", err);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  //Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/student", formData, config);
      console.log("first ho gaya re baba", res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  //Login Student User

  const Studentlogin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // console.log(formData);

      const res = await axios.post("/api/auth/student", formData, config);
      console.log("data to be seen", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS_STUDENT,
        payload: res.data,
      });
      // loadUser();
    } catch (err) {
      console.log("Yerror occured");

      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  //Logout

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //Login Faculty User
  const Facultylogin = async (formData) => {
    try {
      // console.log(formData);
      const res = await axios.post("/api/auth/faculty", formData);
      console.log("data to be seen", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS_FACULTY,
        payload: res.data,
      });
      // loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Students Section login

  const StudentSectionlogin = async (formData) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      console.log("Student section login ", formData);
      const res = await axios.post("/api/auth/studentsection", formData);
      // console.log("data to be seen", res.data.token);

      dispatch({
        type: LOGIN_SUCCESS_STUDENTSECTION,
        payload: res.data,
      });
      // loadUser();
      console.log("Ssadja");
    } catch (err) {
      console.log("error student section", err);
      // dispatch({
      //   type: LOGIN_FAIL,
      //   payload: err.response.data.msg,
      // });
    }
  };
  //Clear Errors
  const clearErrors = () => {
    // console.log("clearErrors");
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        userType: state.userType,
        register,
        loadUser,
        Studentlogin,
        logout,
        Facultylogin,
        clearErrors,
        StudentSectionlogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
