import { REQUEST_BONAFIDE, GET_QUERIES, SEND_QUERY } from "../types";

export default (state, action) => {
  switch (action.type) {
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
