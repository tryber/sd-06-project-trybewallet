import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { salvarUsuario } from '../actions';

// import propType from 'prop-types';

import '../css/login.css';

const defaultState ={
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  checkEmail: false,
  checkPassword: false,
  btnEntrar: false,
}

class Login extends React.Component {
  constructor() {
    super();
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = defaultState;
  }

  checkEmail(event) {
    const email = event.target.value;

    const validator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,64}/;
    const validate = email.match(validator);
    if (validate !== null) {
      this.setState({ checkEmail: true, email });
    } else {
      this.setState({ checkEmail: false, email });
    }
  }

  checkPassword(event) {
    const password = event.target.value;

    const validator = 6;
    if (password.length < validator) {
      this.setState({ checkPassword: false, password });
    } else {
      this.setState({ checkPassword: true, password });
    }
  }

  checkValid(input) {
    const { checkEmail, checkPassword } = this.state;

    if (input === 'email') {
      if (checkEmail) {
        this.setState({ emailError: 'email invalido' });
      } else {
        this.setState({ emailError: '' });
      }
    } else {
      if (checkPassword) {
        this.setState({ passwordError: 'A Senha dever ter mais de 5 caracteres' });
      } else {
        this.setState({ passwordError: '' });
      }
    }
  }


  handleClick() {
    const { dispatchUserEmail } = this.props;
    const { email } = this.state;
    dispatchUserEmail(email);
    this.setState({ btnEntrar: true });
  }

  render() {
    return (
      <form className="loginForm">
        <div className="loginInput">
          <input
            type="text"
            name="email"
            value= { this.state.email }
            data-testid="email-input"
            placeholder="Informe o seu email"
            autoFocus
            onChange={ this.checkEmail }
            onBlur={ () => this.checkValid('email') }
          />
          <div className="erroMessage">{this.state.emailError}</div>
          <br />
          <input
            type="password"
            name="password"
            value={ this.state.password }
            data-testid="password-input"
            placeholder="Informe sua Senha"
            onChange={ this.checkPassword }
            onBlur={ () => this.checkValid('password')}
            />
          <div className="erroMessage">{this.state.passwordError}</div>
          <br />
          <button
            disabled={ this.state.btnEntrar }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          {this.state.btnEntrar ? <Redirect to="/carteira" /> : null}
        </div>
      </form>
    )
  }
}

export default Login;
