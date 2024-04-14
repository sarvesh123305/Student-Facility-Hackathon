import axios from "axios";
import {
  GET_STUDENTSECTION_QUERIES,
  GET_LC_REQUESTS,
  UPDATE_LC_REQUEST,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
export const initialLoadUser = () => async (dispatch) => {
  if (localStorage.getItem("token"))
    setAuthToken(localStorage.getItem("token"));
};

export const getAllQueries = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/studentsection/queries");

    dispatch({
      type: GET_STUDENTSECTION_QUERIES,
      payload: res.data,
    });
  } catch (error) {
    console.log("Student Section Error ", error);
  }
};

export const getLeavingCertificateRequests = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/studentsection/getLCRequests");
    console.log("Response is ", response.data);
    dispatch({
      type: GET_LC_REQUESTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLeavingCertificateItem = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/studentsection/updateLCRequest/${data.mis}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};
