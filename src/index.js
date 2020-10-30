import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Switch>
        <Route path='/carteira' component={ Wallet } />
        <Route exact path='/' component={ Login } />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
