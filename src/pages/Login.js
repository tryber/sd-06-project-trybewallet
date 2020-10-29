import React from 'react';
import './style_sheets/Login.css';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { Redirect } from 'react-router-dom';
import { saveUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.checkValidity = this.checkValidity.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      invalidEmail: true,
      invalidPassword: true,
      invalidEmailMsg: '',
      invalidPasswordMsg: '',
      email: '',
      password: '',
      redirect: false,
    };
  }

  handleEmailInput(event) {
    const email = event.target.value;

    const validator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,64}/;
    const validate = email.match(validator);

    if (validate !== null) {
      this.setState({ invalidEmail: false, email });
    } else {
      this.setState({ invalidEmail: true, email });
    }
  }

  handlePasswordInput(event) {
    const password = event.target.value;

    const validator = 6;
    if (password.length === validator) {
      this.setState({ invalidPassword: false, password });
    } else {
      this.setState({ invalidPassword: true, password });
    }
  }

  checkValidity(input) {
    const { invalidEmail, invalidPassword } = this.state;

    if (input === 'email') {
      const errorMsg = 'E-mail inválido!';
      if (invalidEmail) {
        this.setState({ invalidEmailMsg: errorMsg });
      } else {
        this.setState({ invalidEmailMsg: '' });
      }
    } else {
      const errorMsg = 'Senha precisa conter 6 dígitos!';
      if (invalidPassword) {
        this.setState({ invalidPasswordMsg: errorMsg });
      } else {
        this.setState({ invalidPasswordMsg: '' });
      }
    }
  }

  handleClick() {
    const { dispatchUserEmail } = this.props;
    const { email } = this.state;
    dispatchUserEmail(email);
    this.setState({ redirect: true });
  }

  render() {
    const {
      invalidEmail,
      invalidPassword,
      invalidEmailMsg,
      invalidPasswordMsg,
      email,
      password,
      redirect,
    } = this.state;
    return (
      <main className="login-section">
        <input
          placeholder="youremail@email.com"
          value={ email }
          type="text"
          data-testid="email-input"
          required
          onChange={ this.handleEmailInput }
          onBlur={ () => this.checkValidity('email') }
        />
        {invalidEmailMsg ? <span>{invalidEmailMsg}</span> : null}

        <input
          placeholder="Your password"
          value={ password }
          type="password"
          data-testid="password-input"
          maxLength="6"
          required
          onChange={ this.handlePasswordInput }
          onBlur={ () => this.checkValidity('password') }
        />
        {invalidPasswordMsg ? <span>{invalidPasswordMsg}</span> : null}

        <button
          type="button"
          disabled={ invalidEmail + invalidPassword }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        {redirect ? <Redirect to="/carteira" /> : null}
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (userEmail) => dispatch(saveUser(userEmail)),
});

Login.propTypes = {
  dispatchUserEmail: propType.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
