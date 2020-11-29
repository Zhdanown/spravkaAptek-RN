import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import logSearchHistory from './middleware/logSearchHistory';
import DateTransform from './Transforms';
import migrations from './migrations';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(migrations),
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
