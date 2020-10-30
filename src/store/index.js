import { createStore } from 'redux';
import reducersCombined from '../reducers';

const store = createStore(reducersCombined);

export default store;
