import {combineReducers} from "redux";
import filterReducer from "./filter";
import searchReducer from "./search";
import locationReducer from "./location";

const rootReducer = combineReducers({
  filter: filterReducer,
  search: searchReducer,
  location: locationReducer,
});

export default rootReducer