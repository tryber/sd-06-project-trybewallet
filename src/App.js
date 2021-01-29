import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css'

function App() {
  return (
    <div>
    	<h1> Trybe Wallet,</h1>
    		<p>Hora de organizar as finanças.</p>
    			<Switch>
      				<Route exact path="/" component={ Login } />
     			 	<Route path="/carteira" component={ Wallet } />
    			</Switch>
    </div>
  );
}

export default App;
