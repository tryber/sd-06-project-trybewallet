import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { storeEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isPasswordValid: false,
      isEmailValid: false,
    };

    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  emailValidation(email) {
    const regex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (regex.test(email.toLowerCase())) {
      this.setState({ isEmailValid: true, email });
    } else {
      this.setState({ isEmailValid: false });
    }
  }

  passwordValidation(password) {
    const passwordLength = 6;
    if (password.length >= passwordLength) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }
  }

  render() {
    const { isEmailValid, isPasswordValid, email } = this.state;
    const { saveEmail } = this.props;
    return (
      <div className="login-container">
        <h2>LOGIN</h2>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          onChange={ (e) => this.emailValidation(e.target.value) }
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          data-testid="password-input"
          onChange={ (e) => this.passwordValidation(e.target.value) }
          placeholder="Senha"
        />
        <br />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !(isEmailValid && isPasswordValid) }
            onClick={ () => saveEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(storeEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};
