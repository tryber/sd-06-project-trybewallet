import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailUpdate, passwordUpdate } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
  }

  validateEmail(email) {
    const validateEmailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

    return validateEmailRegex.test(email);
  }

  validatePassword(password) {
    const minimumPasswordLength = 6;

    return (password.length >= minimumPasswordLength);
  }

  handleDisableButton() {
    const { user: { email, password } } = this.props;
    const { validateEmail, validatePassword } = this;

    return (!validateEmail(email) || !validatePassword(password));
  }

  render() {
    const { emailUpdateAction, passwordUpdateAction } = this.props;
    const { user: { email, password } } = this.props;
    const { handleDisableButton } = this;

    return (
      <form>
        <label htmlFor="email-input-id">Insira seu e-mail:</label>
        <input
          type="text"
          placeholder="email@domain.com"
          data-testid="email-input"
          name="email-input-id"
          id="email-input-id"
          onChange={ ({ target: { value } }) => emailUpdateAction(value) }
          value={ email }
        />
        <label htmlFor="password-input-id">Insira seu password:</label>
        <input
          type="password"
          placeholder="password"
          data-testid="password-input"
          id="password-input-id"
          name="password-input-id"
          onChange={ ({ target: { value } }) => passwordUpdateAction(value) }
          value={ password }
        />
        <Link to="/carteira">
          <button
            disabled={ handleDisableButton() }
            type="submit"
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  emailUpdateAction: (email) => dispatch(emailUpdate(email)),
  passwordUpdateAction: (password) => dispatch(passwordUpdate(password)),
});

Login.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  emailUpdateAction: PropTypes.func.isRequired,
  passwordUpdateAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
