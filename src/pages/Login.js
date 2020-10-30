import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      email: '',
      emailIsValid: false,
      passwordIsValid: false,
    };

    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  shouldEnableButton() {
    const { emailIsValid, passwordIsValid } = this.state;

    if (emailIsValid && passwordIsValid) this.setState({ buttonDisabled: false });
    else this.setState({ buttonDisabled: true });
  }

  // refatorar p/ criar um hadler único de estado
  emailValidation(event) {
    const email = event.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    this.setState({ email, emailIsValid: isValid }, () => this.shouldEnableButton());
  }

  passwordValidation(event) {
    const password = event.target.value;
    const isValid = /^.{6,}$/.test(password);

    this.setState({ passwordIsValid: isValid }, () => this.shouldEnableButton());
  }

  render() {
    const { buttonDisabled, email } = this.state;
    const { saveEmail } = this.props;

    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            placeholder="digite o seu email"
            onChange={ this.emailValidation }
          />

          <input
            data-testid="password-input"
            placeholder="digite sua senha"
            onChange={ this.passwordValidation }
          />

          <Link to="/carteira">
            <button
              id="login-button"
              disabled={ buttonDisabled }
              type="button"
              onClick={ () => saveEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ saveEmail: (e) => dispatch(login(e)) });

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = { saveEmail: PropTypes.func.isRequired };
