import {combineReducers} from "redux";
import filterReducer from "./filter";
import searchReducer from "./search";

const rootReducer = combineReducers({
  filter: filterReducer,
  search: searchReducer
});

export default rootReducer