import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  // usado para o uso do REDUX DEV TOOLS
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
