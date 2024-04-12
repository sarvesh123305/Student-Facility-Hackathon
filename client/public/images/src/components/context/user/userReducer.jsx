import {
  REQUEST_BONAFIDE,
  GET_QUERIES,
  SEND_QUERY,
  GET_STUDENT_DETAILS,
} from "../types";

export default (state, action) => {
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
    case SEND_QUERY:
      return {
        ...state,
      };
    default:
      return state;
  }
};
