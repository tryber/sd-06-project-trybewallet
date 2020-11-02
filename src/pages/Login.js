import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input type="email" data-testid="email-input" />
        </label>
        <br />
        <label htmlFor="password">
          Senha:
          <input type="password" data-testid="password-input" />
        </label>
        <br />
        <button type="button">Entrar</button>
      </div>);
  }
}

export default Login;
