import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import { login, addexpenses } from '../actions/index';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
);

export const actionCreators = bindActionCreators(
  {
    login,
    addexpenses,
  },
  store.dispatch,
);

export default store;
