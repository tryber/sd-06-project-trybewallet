import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
// export default createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
