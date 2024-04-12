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
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
axios.defaults.baseURL = "http://localhost:5000";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth/student");
      // console.log("Data got", res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log("got here bangged");
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
      console.log(formData);
      const res = await axios.post("/api/auth/student", formData, config);
      console.log("data to be seen", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
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
  //Logout

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //Login Faculty User
  const Facultylogin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        "http://localhost:5000/api/auth/faculty",
        formData,
        config
      );
      console.log("data to be seen", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
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
        register,
        loadUser,
        Studentlogin,
        logout,
        Facultylogin,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
