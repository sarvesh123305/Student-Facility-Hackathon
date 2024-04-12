import React, { useReducer } from "react";
import axios from "axios";
import userReducer from "./userReducer";
import { REQUEST_BONAFIDE, GET_QUERIES, SEND_QUERY } from "../types";
import UserContext from "./userContext";
axios.defaults.baseURL = "http://localhost:5000";

const UserState = (props) => {
  const initialState = {
    userType: null,
    bonafide: [],
    queries: [],
  };
  // const getToken(){
  //   try{
  //     const toke
  //   }
  // }
  const [state, dispatch] = useReducer(userReducer, initialState);

  //Bonafide request
  const requestBonafide = () => {
    console.log("Request Bonafide successfull");
  };

  const getQueries = async () => {
    // console.log("Got the queries");
    try {
      const token = localStorage.getItem("token"); // no need of this should be removed ,done for testing
      if (!token) {
        throw new Error("Missing user token");
      }
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const res = await axios.get("/api/student/queries", config);
      // console.log(res.data);
      dispatch({
        type: GET_QUERIES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sendQuery = async (message) => {
    try {
      // const message = {
      //   query: "Ogmg this is so good",
      //   type: "No type",
      //   to: "students section",
      //   from: "65e95437e7cadf2e0f732b77",
      // };
      const token = localStorage.getItem("token"); //
      if (!token) {
        throw new Error("Missing user token");
      }
      const config = {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/student/queries", message, config);
      dispatch({
        type: SEND_QUERY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <UserContext.Provider
      value={{
        userType: state.userType,
        bonafide: state.bonafide,
        queries: state.queries,
        requestBonafide,
        getQueries,
        sendQuery,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
