import { combineReducers } from "redux";
import logReducer from "./logReducer";
import facultyReducer from "./facultyReducer";
import studentSectionReducer from "./studentSectionReducer";

export default combineReducers({
  student: logReducer,
  faculty: facultyReducer,
  studentsection: studentSectionReducer,
});
