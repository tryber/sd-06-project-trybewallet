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
    this.disableButton = this.disableButton.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailchange({ value }) {
    this.setState({ email: value });
  }

  onPasswordChange({ value }) {
    this.setState({ password: value });
  }

  disableButton() {
    const { email, password } = this.state;
    const simpleEmailRegex = /.+@.+\.com/;
    const validEmail = simpleEmailRegex.test(email);
    const passwordMinimunLength = 6;
    const validPassword = password.length >= passwordMinimunLength;
    if (validPassword && validEmail) {
      return false;
    }
    return true;
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
              disabled={ this.disableButton() }
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
