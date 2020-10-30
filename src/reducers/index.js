import { combineReducers } from 'redux';

import user from './user';
// import wallet from './wallet';

const rootReducer = combineReducers({ user });

export default rootReducer;

// const store = createStore(rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export default store;
