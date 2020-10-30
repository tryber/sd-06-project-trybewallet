import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import user from '../reducers/user';
import wallet from '../reducers/wallet';

const rootReducer = combineReducers({ user, wallet });

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ));

export default store;
