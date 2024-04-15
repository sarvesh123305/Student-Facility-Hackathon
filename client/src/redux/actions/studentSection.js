import axios from "axios";
import {
  GET_STUDENTSECTION_QUERIES,
  GET_BONAFIDE_REQUESTS,
  GET_SCHOLARSHIP_REQUESTS,
  GET_FEERECEIPT_REQUESTS,
  GET_LC_REQUESTS,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
export const initialLoadUser = () => async (dispatch) => {
  if (localStorage.getItem("token"))
    setAuthToken(localStorage.getItem("token"));
};

export const getAllQueries = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/studentsection/getQueries");

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
    await axios.post(
      `/api/studentsection/updateLCRequest/${data.mis}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const getScholarshipRequests = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/studentsection/getScholarshipRequests");
    console.log("Response is ", response.data);
    dispatch({
      type: GET_SCHOLARSHIP_REQUESTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateScholarshipItem = (data) => async (dispatch) => {
  try {
    await axios.post(
      `/api/studentsection/updateScholarshipRequest/${data.mis}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const getFeeReceiptRequests = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/studentsection/getFeeReceiptRequests");
    console.log("Response is ", response.data);
    dispatch({
      type: GET_FEERECEIPT_REQUESTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateFeeReceiptItem = (data) => async (dispatch) => {
  try {
    await axios.post(
      `/api/studentsection/updateFeeReceiptRequest/${data.mis}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const getBonafideRequests = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/studentsection/getBonafideRequests");
    console.log("Response is ", response.data);
    dispatch({
      type: GET_BONAFIDE_REQUESTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateBonafideItem = (data) => async (dispatch) => {
  try {
    await axios.post(
      `/api/studentsection/updateBonafideRequest/${data.mis}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateQueryItem = (data) => async (dispatch) => {
  try {
    await axios.post(
      `/api/studentsection/updateQuery/${data.from}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};
