import {
  GET_STUDENT_DETAILS,
  GET_QUERIES,
  UPDATE_STUDENT,
  GET_BONAFIDE_STATUS,
  GET_FEERECEIPT_STATUS,
  GET_LC_REQUESTS,
} from "./types";
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
    // console.log("got here bangged", err);
  }
};
export const bonafideDownload = (formData, setPdfData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/student/requestBonafide",
      formData,
      {
        responseType: "arraybuffer",
      }
    );
    console.log("reso", response);
    // if (response.data)
    //   setPdfData(new Blob([response.data], { type: "application/pdf" }));
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

export const FeeReceiptDownload =
  (formData, setPdfData) => async (dispatch) => {
    try {
      console.log(formData);
      const response = await axios.post(
        "/api/student/FeeReceipt",
        { formData },
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

export const LeavingCertificateDownload =
  (formData, setPdfData) => async (dispatch) => {
    try {
      console.log(formData);
      const response = await axios.post(
        "/api/student/LeavingCertificate",
        { formData },
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

export const sendQuery = (message) => async (dispatch) => {
  try {
    console.log(message);
    await axios.post("/api/student/sendQuery", message);
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
    // console.log("Queries ", res.data);
    dispatch({
      type: GET_QUERIES,
      payload: res.data,
    });

    console.log("Completed");
  } catch (err) {
    console.log(err);
  }
};

export const getNotifications = () => async (dispatch) => {
  try {
    // console.log("Queries");
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get("/api/student/queries");
    // console.log("Queries ", res.data);
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
    // Check if formData.mis in bonafides
    // const repeat = await axios.post(
    //   "/api/studentsection/bonafideApplications",
    //   {
    //     mis: formData.mis,
    //   }
    // );

    // if (repeat.data.msg === "Bonafide Application Found") {
    //   alert("Duplicate Entry Exists");
    //   return;
    // }
    const res = await axios.post("/api/student/sendBonafideRequest", formData);
  } catch (err) {
    console.log(err);
  }
};

export const getBonafideStatus = (mis) => async (dispatch) => {
  try {
    // Check if formData.mis in bonafides
    console.log("Yes yes in");
    const getResp = await axios.post(
      "/api/studentsection/bonafideApplications",
      {
        mis: mis,
      }
    );
    if (getResp.data.msg === "Bonafide Appliacation Found") {
      dispatch({
        type: GET_BONAFIDE_STATUS,
        payload: true,
      });
      return;
    }
    dispatch({
      type: GET_BONAFIDE_STATUS,
      payload: false,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFeeReceitStatus = (mis) => async (dispatch) => {
  try {
    // Check if formData.mis in bonafides
    const getResp = await axios.post(
      "/api/studentsection/FeeReceitApplications",
      {
        mis: mis,
      }
    );
    if (getResp.data.msg === "No Fee Receipts found") {
      dispatch({
        type: GET_FEERECEIPT_STATUS,
        payload: true,
      });
      return;
    }
    dispatch({
      type: GET_BONAFIDE_STATUS,
      payload: false,
    });
  } catch (err) {
    console.log(err);
  }
};

/*
 */
