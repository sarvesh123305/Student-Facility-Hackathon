import { GET_STUDENT_DETAILS } from "./types";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
export const initialLoadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/student/getStudentDetails`);
    console.log("What is undefined ", res.data);
    dispatch({
      type: GET_STUDENT_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    console.log("got here bangged", err);
  }
};

/*
//Bonafide request
  const initialLoadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      axios.defaults.headers.common["x-auth-token"] = localStorage.token;
      // console.log(localStorage.getItem("token"));
      const res = await axios.get(`/api/student/getStudentDetails`);
      console.log(res.data);
      dispatch({
        type: GET_STUDENT_DETAILS,
        payload: res.data,
      });
    } catch (err) {
      console.log("got here bangged", err);
      // dispatch({
      //   type: AUTH_ERROR,
      // });
    }
    // initialLoadUser
  };
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
*/
