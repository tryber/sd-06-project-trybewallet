import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../actions';
import logo from '../imgs/trybe.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.ChangeEmail = this.ChangeEmail.bind(this);
    this.ChangePassword = this.ChangePassword.bind(this);

    this.state = {
      email: '',
      emailValid: false,
      passwordValid: false,
    };
  }

  ChangeEmail(e) {
    const email = e.target.value;
    let emailValid = false;
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (re.test(email.toLowerCase())) {
      emailValid = true;
    }
    this.setState({ email, emailValid });
  }

  ChangePassword(e) {
    const password = e.target.value;
    let passwordValid = false;
    const maxText = 6;
    if (password.length >= maxText) {
      passwordValid = true;
    }
    this.setState({ passwordValid });
  }

  render() {
    const { email, emailValid, passwordValid } = this.state;
    const { loginUser } = this.props;
    return (
      <div className="login-container">
        <h1 className="login-title">PROJECT TRYBE WALLET</h1>
        <form className="form-container">
          <img className="logo-login" src={ logo } alt="Logo Trybe" />
          <input
            className="input-form-login"
            type="text"
            placeholder="Enter e-mail"
            data-testid="email-input"
            onChange={ this.ChangeEmail }
          />
          <input
            className="input-form-login"
            type="password"
            placeholder="Enter password"
            data-testid="password-input"
            onChange={ this.ChangePassword }
          />
          <Link to="/carteira">
            <button
              className="button-form-login"
              type="button"
              disabled={ !(emailValid && passwordValid) }
              onClick={ () => loginUser(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  { loginUser: (email) => dispatch(saveUser(email)) }
);

Login.propTypes = {
  loginUser: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
