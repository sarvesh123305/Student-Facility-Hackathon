import { GET_STUDENTSECTION_QUERIES, GET_LC_REQUESTS, GET_FEERECEIPT_REQUESTS, GET_SCHOLARSHIP_REQUESTS, GET_BONAFIDE_REQUESTS} from "../actions/types";

const initialState = {
  queries: null,
  leavingCertificateRequests: null,
  scholarshipRequests: null,
  feeReceiptRequests: null,
  bonafideRequests: null,
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

      case GET_SCHOLARSHIP_REQUESTS:
      return {
        ...state,
        scholarshipRequests: action.payload,
      };

      case GET_FEERECEIPT_REQUESTS:
        return {
          ...state,
          feeReceiptRequests: action.payload,
        };

        case GET_BONAFIDE_REQUESTS:
        return {
          ...state,
          bonafideRequests: action.payload,
        };
        
    default:
      return state;
  }
};
