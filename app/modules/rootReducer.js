import {combineReducers} from "redux";
import settingsReducer from "./settings";
import searchReducer from "./search";
import locationReducer from "./location";
import referenceReducer from "./reference";

const rootReducer = combineReducers({
  settings: settingsReducer,
  search: searchReducer,
  reference: referenceReducer,
  location: locationReducer,
});

export default rootReducer