import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import addEmailToRecord from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailchange = this.onEmailchange.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailchange({ value }) {
    const simpleEmailRegex = /.+@.+\.com/;
    const validEmail = simpleEmailRegex.test(value);
    const inputPassword = document.getElementById('password').value;
    if (inputPassword !== null) {
      const passwordMinimunLength = 6;
      const validPassword = inputPassword.length >= passwordMinimunLength;
      this.enableButton(validEmail, validPassword);
    }
    this.setState({ email: value });
  }

  onPasswordChange({ value }) {
    const passwordMinimunLength = 6;
    const validPassword = value.length >= passwordMinimunLength;
    const inputEmail = document.getElementById('email').value;
    if (inputEmail !== null) {
      const simpleEmailRegex = /.+@.+\..+/;
      const validEmail = simpleEmailRegex.test(inputEmail);
      this.enableButton(validEmail, validPassword);
    }
    this.setState({ password: value });
  }

  enableButton(validEmail, validPassword) {
    if (validEmail && validPassword) {
      document.getElementById('login-button').removeAttribute('disabled');
    } else {
      document.getElementById('login-button').setAttribute('disabled', 'true');
    }
  }

  render() {
    const { registerEmail } = this.props;
    const { email, password } = this.state;
    return (
      <div>
        <form className="login-page">
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="email-input"
            placeholder="email"
            onChange={ ({ target }) => this.onEmailchange(target) }
          />
          <input
            type="password"
            id="password"
            value={ password }
            data-testid="password-input"
            placeholder="password"
            onChange={ ({ target }) => this.onPasswordChange(target) }
          />
          <Link to="/carteira" onClick={ () => registerEmail(email) }>
            <button
              type="button"
              id="login-button"
              disabled
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

function mapDispacthToProps(dispatch) {
  return {
    registerEmail: (email) => dispatch(addEmailToRecord(email)),
  };
}

export default connect(null, mapDispacthToProps)(Login);
