import React from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import { connect } from 'react-redux';
import { addEmailToState } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.emailCheck = this.emailCheck.bind(this);
    this.addToOwnState = this.addToOwnState.bind(this);
    this.itWasUpdated = this.itWasUpdated.bind(this);
    this.btLogin = this.btLogin.bind(this);

    this.state = {
      email: '',
      password: '',
      emailWarning: false,
      passwordWarning: false,
      btEnterIsDisabled: true,
      wasUpdated: false,
    };
  }

  componentDidUpdate() {
    const { email, password, wasUpdated } = this.state;
    if (wasUpdated) {
      this.emailCheck(email, password);
      this.itWasUpdated();
    }
  }

  itWasUpdated() {
    this.setState({ wasUpdated: false });
  }

  emailCheck(email, password) {
    console.log(email);
    // Font: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const MIN_CHARACTERS = 6;
    if (password.length < MIN_CHARACTERS) {
      this.setState({ passwordWarning: false });
    }

    if (email.match(emailCheck) && email !== '') {
      if (password.length >= MIN_CHARACTERS) {
        this.setState({ btEnterIsDisabled: false, passwordWarning: false });
      } else {
        this.setState({ btEnterIsDisabled: true, passwordWarning: true });
      }
      this.setState({ emailWarning: false });
    } else {
      this.setState({ btEnterIsDisabled: true, emailWarning: true });
    }
  }

  addToOwnState(nameAttribute, value) {
    this.setState({ [nameAttribute]: value, wasUpdated: true });
  }

  btLogin() {
    const { addEmail } = this.props;
    const { email } = this.state;
    addEmail(email, true);
  }

  render() {
    const {
      email,
      password,
      emailWarning,
      passwordWarning,
      btEnterIsDisabled,
    } = this.state;
    const { loggedIn } = this.props;

    const errorEmail = 'E-mail inválido';
    const errorMsgPassword = 'Senha inválida. A senha precisa ter no mínimo 6 caracteres';
    return (
      <div className="app-content">
        {(loggedIn) ? <Redirect push to="/carteira" /> : null}
        {(emailWarning) ? <span className="error-msg">{errorEmail}</span> : null}
        {(passwordWarning) ? <span className="error-msg">{errorMsgPassword}</span> : null}
        <form className="login-form">
          <div className="logo-vbwallet">
            <span className="vb-logo">VB</span>
            <span className="wallet-logo">Wallet</span>
          </div>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Login"
            value={ email }
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
            disabled={ btEnterIsDisabled }
            onClick={ () => this.btLogin() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email, loggedIn) => dispatch(addEmailToState(email, loggedIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
