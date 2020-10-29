import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input type="email" data-testid="email-input" placeholder="Email"/>
        <input type="senha" data-testid="password-input" placeholder="Senha"/>
        <Link to="/carteira"><button>Entrar</button></Link>
      </div>
    );
  }
}

export default Login;
