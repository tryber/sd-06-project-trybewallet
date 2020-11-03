import { applyMiddleware, createStore, compose } from 'react-redux';
import thunk from 'redux-thunk';
import combiner from '../reducers';

// const reducer = () => {};
const aux = createStore(combiner,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ));
export default aux;
