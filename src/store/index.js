import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// export default createStore(rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ));

export default createStore(rootReducer, applyMiddleware(thunk));
