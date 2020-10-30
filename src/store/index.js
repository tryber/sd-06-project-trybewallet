import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import wallet from '../reducers/wallet';
import user from '../reducers/user';

//Código importado do Slack, com a ajuda com Instrutor Ícaro

const composeWithDevTools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (...args) => {
        if (args.length === 0) return undefined;
        if (typeof args[0] === 'object') return compose;
        return compose(...args);
      };
const rootReducers = combineReducers({ user, wallet });
export default rootReducers;
export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
