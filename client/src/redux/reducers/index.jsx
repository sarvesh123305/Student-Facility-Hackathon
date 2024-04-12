import { combineReducers } from "redux";
import logReducer from "./logReducer";
import facultyReducer from "./facultyReducer";

export default combineReducers({
  student: logReducer,
  faculty: facultyReducer,
});
