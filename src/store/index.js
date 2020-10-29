import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const composeEnhancer = (typeof window !== 'undefined'
  && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
