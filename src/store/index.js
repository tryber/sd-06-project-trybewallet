import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
// redux-thunk para permitir criar actions assíncronas

import rootReducer from '../reducers';

export default createStore(rootReducer,
  compose(compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())));
