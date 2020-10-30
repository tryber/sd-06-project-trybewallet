import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import addEmailToRecord from '../actions';
import store from '../store';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailchange = this.onEmailchange.bind(this);
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
  }

  enableButton(validEmail, validPassword) {
    if (validEmail && validPassword) {
      document.getElementById('login-button').removeAttribute('disabled');
    } else {
      document.getElementById('login-button').setAttribute('disabled', 'true');
    }
    console.log(store.addRecord);
  }

  render() {
    console.log(this.props);
    const { registerEmail } = this.props;
    return (
      <div>
        <form className="login-page">
          <input
            type="email"
            id="email"
            data-testid="email-input"
            placeholder="email"
            onChange={ ({ target }) => this.onEmailchange(target) }
          />
          <input
            type="password"
            id="password"
            data-testid="password-input"
            placeholder="password"
            onChange={ ({ target }) => this.onPasswordChange(target) }
          />
          <Link to="/carteira">
            <button
              type="button"
              id="login-button"
              disabled
              onClick={ () => registerEmail(document.getElementById('email').value) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.addRecord.user.email,
  };
}

function mapDispacthToProps(dispatch) {
  return {
    registerEmail: (email) => dispatch(addEmailToRecord(email)),
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(Login);
