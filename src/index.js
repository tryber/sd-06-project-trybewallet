import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Wallet from './pages/Wallet';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={ store }>
        <Route exact path="/" component={ App } />
        <Route path="/carteira" component={ Wallet } />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
