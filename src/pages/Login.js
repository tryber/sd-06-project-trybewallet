import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form className="login-page">
          <input
            type="email"
            data-testid="email-input"
            placeholder="email"
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="password"
          />
          <button type="button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
