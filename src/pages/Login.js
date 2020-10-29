import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            value=""
            data-testid="email-input"
            placeholder="Nome"
            onChange={ () => console.log('Nome') }
            required
          />
          <input
            type="text"
            value=""
            data-testid="password-input"
            placeholder="Email"
            onChange={ () => console.log('Nome') }
            maxLength="6"
          />
          <button type="button"><Link to="/carteira">Entrar</Link></button>
        </form>
      </div>
    );
  }
}

export default Login;
