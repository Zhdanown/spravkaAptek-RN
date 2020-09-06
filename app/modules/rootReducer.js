import {combineReducers} from "redux";
import settingsReducer from "./settings";
import searchReducer from "./search";
import locationReducer from "./location";

const rootReducer = combineReducers({
  settings: settingsReducer,
  search: searchReducer,
  location: locationReducer,
});

export default rootReducer