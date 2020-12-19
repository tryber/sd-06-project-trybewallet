import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const composeEnhancer = (typeof window !== 'undefined'
  && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) || compose;

export default createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
