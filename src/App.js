import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
// github = paulo lins, havyner
// tantos plantoes qto foi possivel assistir
// youtube = tantaum de canal - principal rocketseat
// foruns em redes sociais
// discord = tantaum de gente
// agradecimento especial a Paulo Lins!
