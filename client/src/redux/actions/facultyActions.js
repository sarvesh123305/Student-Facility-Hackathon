import axios from "axios";
import { GET_ELECTIVE_CATEGORY_LIST } from "./types";
// import {}
export const initialLoadUser = () => async (dispatch) => {};

export const getElectivesList = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/student/semesterCreditRegistration");
    dispatch({
      type: GET_ELECTIVE_CATEGORY_LIST,
      payload: res.data,
    });
  } catch (error) {
    console.log("Faculty Error ", error);
  }
};
