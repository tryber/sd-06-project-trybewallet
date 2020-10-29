import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user } from '../actions';

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
      <div>
        <form>
          <h1>Trybe</h1>
          <input
            type="text"
            placeholder="Enter e-mail"
            data-testid="email-input"
            onChange={ this.ChangeEmail }
          />
          <input
            type="password"
            placeholder="Enter password"
            data-testid="password-input"
            onChange={ this.ChangePassword }
          />
          <Link to="/carteira">
            <button
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
  { loginUser: (email) => dispatch(user(email)) }
);

Login.propTypes = {
  loginUser: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
