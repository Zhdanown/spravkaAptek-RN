import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import logSearchHistory from './middleware/logSearchHistory';


const middleware = [thunk, logSearchHistory]

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store; 