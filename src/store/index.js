import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducersCombined from '../reducers';

const store = createStore(
  reducersCombined,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
