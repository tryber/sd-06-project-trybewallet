import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers/user';

export default createStore(reducer, applyMiddleware(thunk));
