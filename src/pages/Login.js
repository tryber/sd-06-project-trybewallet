import React from 'react';
import { Redirect } from 'react-router-dom';

import trybeWallet from '../imgs/trybeWallet.png';
import '../css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enableLogin: false,
      loginError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    return (email.checkValidity() && password.checkValidity())
      ? this.setState({ loginError: false, enableLogin: true })
      : this.setState({ loginError: true });
  }

  render() {
    const { loginError, enableLogin } = this.state;
    const { handleSubmit } = this;

    return (!enableLogin)
      ? (
        <div>
          <img src={ trybeWallet } alt="Trybe logo" />
          <form>
            <fieldset className="login-fieldset">
              <legend>Login</legend>
              {
                (loginError)
                  ? (
                    <p className="login-error">
                      Por favor, confira as informações preenchidas.
                    </p>
                  )
                  : <span />
              }
              <label htmlFor="email">
                E-mail
                <input type="email" id="email" data-testid="email-input" required />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  minLength="6"
                  required
                  data-testid="password-input"
                />
              </label>
            </fieldset>
            <button type="button" onClick={ handleSubmit } className="login-btn">
              Entrar
            </button>
          </form>
        </div>
      )
      : <Redirect to="/carteira" />;
  }
}

export default Login;
