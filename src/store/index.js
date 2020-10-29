import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import stateReducer from '../reducers/';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ stateReducer });

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
