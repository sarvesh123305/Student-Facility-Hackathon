import {
  GET_STUDENT_DETAILS,
  GET_QUERIES,
  UPDATE_STUDENT,
} from "../actions/types";

const initialState = {
  studentInformation: null,
  academicProfile: null,
  studentDetails: null,
  userType: null,
  bonafide: [],
  queries: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENT_DETAILS:
      return {
        ...state,
        studentInformation: action.payload.studentInformation,
        academicProfile: action.payload.academicProfile,
        studentDetails: action.payload.studentDetails,
      };
    case GET_QUERIES:
      return {
        ...state,
        queries: action.payload,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        studentInformation: action.payload,
      };
    default:
      return state;
  }
};
