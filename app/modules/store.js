import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import logSearchHistory from './middleware/logSearchHistory';
import DateTransform from "./Transforms";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [DateTransform]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk, logSearchHistory];
const store = createStore(persistedReducer, applyMiddleware(...middleware));

let persistor = persistStore(store);

export {
  store, persistor
};