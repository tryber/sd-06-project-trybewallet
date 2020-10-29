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
      password: 0,
      enableLogin: false,
      fieldsValidated: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleInput({ target }) {
    this.setState({ [target.id]: target.value });
    const fieldsAreValid = this.validateFields();
    if (fieldsAreValid) {
      this.setState({ fieldsValidated: true });
    } else {
      this.setState({ fieldsValidated: false });
    }
  }

  validateFields() {
    const { email, password } = this.state;
    const minLength = 5;
    // Found this beautiful RegEx at https://ui.dev/validate-email-address-javascript/
    const validEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const validPassword = (password.length >= minLength);
    const loginIsValid = (validEmail && validPassword);

    return loginIsValid;
  }

  handleSubmit(email) {
    const { loginUserDispatch } = this.props;
    loginUserDispatch(email);
    this.setState({ enableLogin: true });
  }

  render() {
    const { enableLogin, email, fieldsValidated } = this.state;
    const { handleInput, handleSubmit } = this;

    return (!enableLogin)
      ? (
        <div>
          <img src={ trybeWallet } alt="Trybe logo" />
          <form>
            <fieldset className="login-fieldset">
              <legend>Login</legend>
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
                  onChange={ handleInput }
                  required
                  data-testid="password-input"
                />
              </label>
            </fieldset>
            { (fieldsValidated)
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
