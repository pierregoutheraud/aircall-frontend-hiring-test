import { combineReducers } from "redux";
import auth from "./auth";
import calls from "./calls";

const reducers = combineReducers({
  auth,
  calls,
});

export default reducers;
