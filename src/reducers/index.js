import { combineReducers } from "redux";
import filmReducer from "./filmReducer.js";

const rootReducer = combineReducers({
  film: filmReducer,
});

export default rootReducer;
