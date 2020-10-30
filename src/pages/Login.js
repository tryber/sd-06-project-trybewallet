import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.setStateValue = this.setStateValue.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);

    this.state = {
      email: '',
      isDisabled: true,
    };
  }

  setStateValue(event) {
    const { value } = event.target;
    this.setState({
      email: value,
    }, () => {
      this.verifyEmail(value);
    });
  }

  verifyEmail(email) {
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    if (emailFormat) {
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
          onChange={ this.setStateValue }
          type="email"
          data-testid="email-input"
          placeholder="Email"
          minLength="6"
        />
        <input
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
