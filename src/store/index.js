import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';

const composeEnhancer = (typeof window !== 'undefined'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)), // requisição API
);
