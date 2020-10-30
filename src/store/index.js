import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { login } from '../actions/index';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export const actionCreators = bindActionCreators(
  {
    login,
  },
  store.dispatch,
);

export default store;
