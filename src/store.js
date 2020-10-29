import { createStore, applyMiddleware, compose } from 'redux';
//importe o redux-thunk
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//aplique o middleware

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
