import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS_STUDENT,
  LOGIN_SUCCESS_FACULTY,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_SUCCESS_STUDENTSECTION,
  CLEAR_ERRORS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        userType: action.payload.userType,
      };
    case LOGIN_SUCCESS_STUDENT:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        userType: "student",
      };
    case LOGIN_SUCCESS_FACULTY:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        userType: "faculty",
      };
    case LOGIN_SUCCESS_STUDENTSECTION:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        userType: "studentsection",
      };

    case LOGOUT:
      // case LOGIN_FAIL:
      // case AUTH_ERROR:
      // case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
