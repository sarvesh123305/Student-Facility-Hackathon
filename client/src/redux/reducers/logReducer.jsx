import {
  GET_STUDENT_DETAILS,
  GET_QUERIES,
  UPDATE_STUDENT,
  GET_BONAFIDE_STATUS,
  GET_LC_STATUS,
  GET_FEERECEIPT_STATUS,
  GET_LC_REQUESTS,
} from "../actions/types";

const initialState = {
  studentInformation: null,
  academicProfile: null,
  studentDetails: null,
  userType: null,
  bonafide: [],
  queries: [],
  bonafidePresent: false,
  feereceiptStatus: false,
  leavingcertificateStatus: false,
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
    case GET_BONAFIDE_STATUS:
      return {
        ...state,
        bonafidePresent: action.payload,
      };
    case GET_FEERECEIPT_STATUS:
      return {
        ...state,
        feereceiptStatus: action.payload,
      };
    case GET_LC_STATUS:
      return {
        ...state,
        leavingcertificateStatus: action.payload,
      };

    default:
      return state;
  }
};
