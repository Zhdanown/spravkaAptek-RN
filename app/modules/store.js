import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import logSearchHistory from './middleware/logSearchHistory';
import DateTransform from './Transforms';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [DateTransform],
  whitelist: ['settings', 'search'],
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk, logSearchHistory];
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);
let persistor = persistStore(store);

export { store, persistor };
