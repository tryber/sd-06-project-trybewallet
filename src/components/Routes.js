import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

import { history } from '../history';

const Routes = () => (
    <Router history={ history }>
        <Switch>
            <Route component={ Login } exact path="/" />
            <Route component={ Wallet } exact path="/carteira" />
        </Switch>
    </Router>
)

export default Routes;