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
    const validationButton = document.querySelector('.validation-button');
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    if (emailFormat) {
      validationButton.removeAttribute('disabled');
    }
  }

  render() {
    const { email } = this.state;
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
            disabled
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
