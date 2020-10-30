import React from 'react';

import '../css/login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="loginForm">
        <div className="loginInput">
          <input type="text" data-testid="email-input" placeholder="Informe o seu email"/>
          <br />
          <input type="text" data-testid="password-input" placeholder="Informe sua Senha" />
          <br />
          <button>Entrar</button>
        </div>
      </div>
    )
  }
}

export default Login;
