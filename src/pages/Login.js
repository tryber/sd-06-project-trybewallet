import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.setStateEmail = this.setStateEmail.bind(this);
    this.setStatePassword = this.setStatePassword.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  setStatePassword(event) {
    const { value } = event.target;
    this.setState({
      password: value,
    }, () => {
      this.verifyEmail(value);
    });
  }

  setStateEmail(event) {
    const { value } = event.target;
    this.setState({
      email: value,
    });
  }

  verifyEmail() {
    const { password, email } = this.state;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const passwordMinLength = 6;
    if (password.length >= passwordMinLength && emailFormat) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { email, isDisabled } = this.state;
    const { emailAction } = this.props;

    return (
      <div>
        <h2>Login</h2>
        <input
          onChange={ this.setStateEmail }
          type="email"
          data-testid="email-input"
          placeholder="Email"
          minLength="6"
        />
        <input
          onChange={ this.setStatePassword }
          type="password"
          data-testid="password-input"
          placeholder="Senha"
        />
        <Link to="/carteira">
          <button
            className="validation-button"
            type="submit"
            onClick={ () => emailAction(email) }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  emailAction: PropTypes.func.isRequired,
};

const mapDispacthToProps = (dispatch) => ({
  emailAction: (email) => dispatch(login(email)),
});

export default connect(null, mapDispacthToProps)(Login);
