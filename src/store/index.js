import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

/* Código importado do Slack, com a ajuda com Instrutor Ícaro */

const composeWithDevTools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (...args) => {
        if (args.length === 0) return undefined;
        if (typeof args[0] === 'object') return compose;
        return compose(...args);
      };

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));


