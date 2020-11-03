import React from 'react';
import Logo from './images/logo-trybe.png';

class Login extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     email: '',
  //     password: '',
  //     disableButton: true,
  //   };
  // }

  render() {
    return (
      <div className="login-container">
        <img src={ Logo } alt="Logo Trybe" />
        <input
          data-testid="email-input"
          type="email"
          name="email"
          id=""
          placeholder="Digite aqui o seu email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id=""
          placeholder="Digite aqui a sua senha"
        />
        <button type="button">Entrar</button>
      </div>);
  }
}

export default Login;
