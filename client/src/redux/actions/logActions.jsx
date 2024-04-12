import { GET_STUDENT_DETAILS, GET_QUERIES, UPDATE_STUDENT } from "./types";
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
export const bonafideDownload = (formData, setPdfData) => async (dispatch) => {
  try {
    console.log(formData);
    const response = await axios.post(
      "/api/student/requestBonafide",
      formData,
      {
        responseType: "arraybuffer",
      }
    );

    // Store the PDF content in the component state
    setPdfData(new Blob([response.data], { type: "application/pdf" }));
  } catch (error) {
    console.error("Error downloading PDF:", error.message);
  }
};
export const resultDownload = (formData, setPdfData) => async (dispatch) => {
  try {
    console.log(formData);
    const response = await axios.post("/api/student/result", formData, {
      responseType: "arraybuffer",
    });
    setPdfData(new Blob([response.data], { type: "application/pdf" }));
  } catch (error) {
    console.error("Error downloading PDF:", error.message);
  }
};
export const sendQuery = (message) => async (dispatch) => {
  try {
    await axios.post("/api/student/queries", message);
  } catch (err) {
    console.log(err);
  }
};
export const getQueries = () => async (dispatch) => {
  try {
    // console.log("Queries");
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get("/api/student/queries");
    console.log("Queries ", res.data);
    dispatch({
      type: GET_QUERIES,
      payload: res.data,
    });

    // console.log("Completed");
  } catch (err) {
    console.log(err);
  }
};
export const fetchSemesterCreditRegistration =
  (formData, setData) => async (dispatch) => {
    console.log("I am in fetch Semester Credit");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/student/subjectFetchtesting",
        formData
      );
      console.log("Response is ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
export const semesterCreditRegistration = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/student/semesterCreditRegistration",
      formData
    );
    // console.log(res);
    if (res.data.msg === "Student with the same MIS already exists")
      alert(res.data.msg);
    else alert("Semester Credit Registration Success");
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const updateStudent = (mis, formData) => async (dispatch) => {
  try {
    console.log("Hii Got in update student");
    const res = await axios.put(`/api/student/updateStudent/${mis}`, formData);
    console.log(res);
    dispatch({
      type: UPDATE_STUDENT,
      payload: res.data,
    });
    console.log("Bye Completed");
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const sendBonafideRequest = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/student/sendBonafideRequest", formData);
  } catch (err) {
    console.log(err);
  }
};
/*
 */
