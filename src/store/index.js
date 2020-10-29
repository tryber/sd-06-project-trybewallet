import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';

const store = createStore(allReducers,
  compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
