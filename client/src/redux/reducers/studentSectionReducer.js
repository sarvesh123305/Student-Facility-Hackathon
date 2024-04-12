import { GET_STUDENTSECTION_QUERIES } from "../actions/types";

const initialState = {
  queries: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTSECTION_QUERIES:
      return {
        ...state,
        queries: action.payload,
      };
    default:
      return state;
  }
};
