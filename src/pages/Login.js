import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          placeholder="seuemail@email.com"
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Senha"
        />
        <Link to="/carteira">
          <button type="button">
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
