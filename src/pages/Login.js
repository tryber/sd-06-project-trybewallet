import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions';

import trybeWallet from '../imgs/trybeWallet.png';
import '../css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      enableLogin: false,
      loginError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleInput({ target }) {
    this.setState({ [target.id]: target.value });
  }

  validateFields() {
    const { email } = this.state;
    const passwordInput = document.getElementById('password');
    const checkEmail = (emailToVal) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToVal);
    const loginIsValid = checkEmail(email) && passwordInput.checkValidity();

    return loginIsValid;
  }

  handleSubmit(email) {
    const { loginUserDispatch } = this.props;

    if (this.validateFields()) {
      loginUserDispatch(email);
      this.setState({ loginError: false, enableLogin: true });
    } else {
      this.setState({ loginError: true });
    }
  }

  render() {
    const { loginError, enableLogin, email } = this.state;
    const { validateFields, handleInput, handleSubmit } = this;

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
                <input
                  type="email"
                  id="email"
                  data-testid="email-input"
                  required
                  onChange={ handleInput }
                />
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
            { (validateFields())
              ? (
                <button
                  type="button"
                  onClick={ () => handleSubmit(email) }
                  className="login-btn"
                >
                  Entrar
                </button>
              )
              : (
                <button
                  type="button"
                  className="login-btn"
                  disabled
                >
                  Entrar
                </button>
              )}
          </form>
        </div>
      )
      : <Redirect to="/carteira" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUserDispatch: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  loginUserDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
