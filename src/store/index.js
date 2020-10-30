import { applyMiddleware, createStore, compose } from 'redux';
// import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
// ou import reducer from '../reducers';

export default store = 
  createStore( rootReducer,
    compose(applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
