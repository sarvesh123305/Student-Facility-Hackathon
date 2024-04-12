import axios from "axios";
import { GET_STUDENTSECTION_QUERIES } from "./types";
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
