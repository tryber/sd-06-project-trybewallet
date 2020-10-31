import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'react';

import rootReducer from '../reducers';

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);
