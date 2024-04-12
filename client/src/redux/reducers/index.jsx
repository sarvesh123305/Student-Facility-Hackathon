import { combineReducers } from "redux";
import logReducer from "./logReducer";

export default combineReducers({
  student: logReducer,
});
