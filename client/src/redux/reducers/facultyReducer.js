import { GET_ELECTIVE_CATEGORY_LIST } from "../actions/types";

const initialState = {
  electivesCategoryList: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ELECTIVE_CATEGORY_LIST:
      return {
        ...state,
        electivesCategoryList: action.payload,
      };
    default:
      return state;
  }
};
