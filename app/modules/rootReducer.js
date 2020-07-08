import {combineReducers} from "redux";
import FIlterReducer from "./filter";

const rootReducer = combineReducers({
  filter: FIlterReducer
});

export default rootReducer