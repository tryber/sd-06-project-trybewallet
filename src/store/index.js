import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import comb from '../reducers'

const store = createStore(comb, 
  compose(applyMiddleware(thunk), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

export default store;
