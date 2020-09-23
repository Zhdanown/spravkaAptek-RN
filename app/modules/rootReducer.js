import {combineReducers} from "redux";
import settingsReducer from "./settings";
import searchReducer from "./search";
import locationReducer from "./location";
import referenceReducer from "./reference";
import pharmaciesReducer from "./pharmacies"

const rootReducer = combineReducers({
  settings: settingsReducer,
  search: searchReducer,
  reference: referenceReducer,
  location: locationReducer,
  pharmacies: pharmaciesReducer
});

export default rootReducer