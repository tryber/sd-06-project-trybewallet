import React from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.emailCheck = this.emailCheck.bind(this);
    this.addToOwnState = this.addToOwnState.bind(this);

    this.state = {
      login: '',
      password: '',
      loggedIn: false,
      emailWarning: false,
      passwordWarning: false,
    };
  }

  emailCheck(email, password) {
    // Font: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const emailCheck1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const MIN_CHARACTERS = 6;
    if (password.length < MIN_CHARACTERS) {
      this.setState({ passwordWarning: false });
    }

    if (email.match(emailCheck1) && email !== '') {
      if (password.length >= MIN_CHARACTERS) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ passwordWarning: true });
      }
      this.setState({ emailWarning: false });
    } else {
      this.setState({ emailWarning: true });
    }
  }

  addToOwnState(nameAttribute, value) {
    this.setState({ [nameAttribute]: value });
  }

  render() {
    const { login, password, loggedIn, emailWarning, passwordWarning } = this.state;
    let isDisabled;
    // {((emailWarning) || (passwordWarning)) ? (isDisabled = true) : (isDisabled = false);
    return (
      <div className="app-content">
        {(loggedIn) ? <Redirect push to="/carteira" /> : null}
        {(emailWarning) ? <span className="error-msg">E-mail inválido</span> : null}
        {(passwordWarning) ? <span className="error-msg">Senha inválida. A senha precisa ter no mínimo 6 caracteres</span> : null}
        <form className="login-form">
          <div className="logo-vbwallet">
            <span className="vb-logo">VB</span>
            <span className="wallet-logo">Wallet</span>
          </div>
          <input
            type="text"
            name="login"
            data-testid="email-input"
            placeholder="Login"
            value={ login }
            onChange={ ({ target }) => this.addToOwnState(target.name, target.value) }
            required="required"
          />
          <input
            type="password"
            name="password"
            data-testid="email-input"
            placeholder="Password"
            value={ password }
            onChange={ ({ target }) => this.addToOwnState(target.name, target.value) }
            required="required"
          />
          <button
            type="button"
            className="bt-send"
            disabled={ isDisabled }
            onClick={ () => this.emailCheck(login, password) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
