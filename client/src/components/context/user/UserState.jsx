import React, { useReducer } from "react";
import axios from "axios";
import userReducer from "./userReducer";
import { REQUEST_BONAFIDE } from "../types";
import UserContext from "./userContext";
axios.defaults.baseURL = "http://localhost:5000";

const UserState = (props) => {
  const initialState = {
    userType: null,
    bonafide: [],
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //Bonafide request
  const requestBonafide = () => {
    console.log("Request Bonafide successfull");
  };

  return (
    <UserContext.Provider
      value={{
        userType: state.userType,
        bonafide: state.bonafide,
        requestBonafide,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
