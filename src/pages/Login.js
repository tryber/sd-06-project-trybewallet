import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addEmail } from '../actions/index';
import Logo from './images/trybeWallet.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.verifyStatusButton = this.verifyStatusButton.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // Regex utilizado a partir do link: https://www.formget.com/regular-expression-for-email/;
  verifyEmail() {
    let statusEmail = false;
    const { email } = this.state;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isEmailValid = regex.test(email);
    if (isEmailValid) {
      statusEmail = true;
    }
    return statusEmail;
  }

  verifyPassword() {
    let statusPassword = false;
    const { password } = this.state;
    const minimumPasswordLength = 6;
    const isPasswordValid = password.length >= minimumPasswordLength;
    if (isPasswordValid) {
      statusPassword = true;
    }
    return statusPassword;
  }

  verifyStatusButton() {
    let statusDisableButton = true;
    if (this.verifyEmail() && this.verifyPassword()) {
      statusDisableButton = false;
    }
    return statusDisableButton;
  }

  render() {
    const { email } = this.state;
    const { sendEmail } = this.props;
    return (
      <div className="login-container">
        <img src={ Logo } alt="Logo Trybe" width="200px" />
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="Digite aqui o seu email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Digite aqui a sua senha"
          onChange={ this.handleChange }
        />
        <Link to="/carteira" onClick={() => sendEmail(email)}>
          <button type="button" disabled={ this.verifyStatusButton() }>
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
