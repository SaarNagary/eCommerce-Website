import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import {persistStore} from 'redux-persist'
import rootSaga from "./rootSaga";
import { thunk } from "redux-thunk";

const sagaMiddlewares = createSagaMiddleware();



export const middlewares = [thunk,sagaMiddlewares, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddlewares.run(rootSaga)

export const persistor = persistStore(store);

export default {store, persistor};
