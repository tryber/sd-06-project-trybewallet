import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input data-testid="email-input" placeholder="digite o seu email" />
          <input data-testid="password-input" placeholder="digite sua senha" />
          <button>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
