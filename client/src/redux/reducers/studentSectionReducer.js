import { GET_STUDENTSECTION_QUERIES, GET_LC_REQUESTS } from "../actions/types";

const initialState = {
  queries: null,
  leavingCertificateRequests: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTSECTION_QUERIES:
      return {
        ...state,
        queries: action.payload,
      };
    case GET_LC_REQUESTS:
      return {
        ...state,
        leavingCertificateRequests: action.payload,
      };

    default:
      return state;
  }
};
