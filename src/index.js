import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Reducers from './reducers';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter />
    <App />
  </Provider>,
  document.getElementById('root'),
);
