import { combineReducers } from "redux";

const reducers = combineReducers({
  test: state => state || {},
});

export default reducers;
