import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validateLogin = this.validateLogin.bind(this);
    this.renderEnabledLoginBtn = this.renderEnabledLoginBtn.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.state = {
      emailText: '',
      passwordText: '',
      isLoginValid: false,
    };
  }

  validateLogin() {
    const { emailText, passwordText } = this.state;
    const minimumPasswordLength = 6;

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const emailRegExp = /\S+@\S+\.\S+/; // Simple pattern
    const isEmailValid = emailRegExp.test(emailText);
    const isPasswordValid = passwordText.length >= minimumPasswordLength;

    if (isEmailValid && isPasswordValid) {
      this.setState({ isLoginValid: true });
    } else {
      this.setState({ isLoginValid: false });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.validateLogin();
    });
  }

  submitLogin(event) {
    event.preventDefault();
    const { emailText } = this.state;
    const { logInUser, history } = this.props;
    logInUser(emailText);
    history.push('/carteira');
  }

  renderEnabledLoginBtn() {
    return (
      <button
        type="button"
        onClick={ (event) => this.submitLogin(event) }
      >
        Entrar
      </button>
    );
  }

  renderDisabledLoginBtn() {
    return (
      <button type="submit" disabled>Entrar</button>
    );
  }

  render() {
    const { isLoginValid } = this.state;
    return (
      <section className="login">
        <div className="login-container">
          <input
            id="teste"
            type="email"
            name="emailText"
            data-testid="email-input"
            placeholder="Digite seu email"
            onChange={ (event) => this.handleInputChange(event) }
          />
          <input
            type="password"
            name="passwordText"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ (event) => this.handleInputChange(event) }
          />
          {isLoginValid ? this.renderEnabledLoginBtn() : this.renderDisabledLoginBtn()}
        </div>

      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const mappedProps = {
    logInUser: (data) => dispatch(registerUser(data)),
  };
  return mappedProps;
}

Login.propTypes = {
  logInUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
