import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input type="text" data-testid="email-input" />
        <br />
        <input type="password" data-testid="password-input" />
        <button type="button">
          Entrar
        </button>
      </div>);
  }
}

export default Login;
