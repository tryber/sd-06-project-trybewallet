import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { salvarUsuario } from '../actions';

// import propType from 'prop-types';

import '../css/login.css';


class Login extends React.Component {
  constructor() {
    super();
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      checkEmail: false,
      checkPassword: false,
      btnEntrar: false,
    }
  }

  checkEmail(event) {
    const email = event.target.value;

    const validator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,64}/;
    const validate = email.match(validator);
    if (validate !== null) {
      this.setState({ checkEmail: true, email });
      console.log(this.state.checkEmail);
    } else {
      this.setState({ checkEmail: false, email });
      console.log(this.state.checkEmail);
    }
  }

  checkPassword(event) {
    const password = event.target.value;
    // verificar o erro do diley 5 -> 6
    const validator = 5;
    if (password.length < validator) {
      this.setState({ checkPassword: false, password });
      console.log(this.state.checkPassword)
    } else {
      this.setState({ checkPassword: true, password });
      console.log(this.state.checkPassword)
    }
  }

  checkValid(input) {
    const { checkEmail, checkPassword } = this.state;

    if (input === 'email') {
      if (!checkEmail) {
        this.setState({ emailError: 'email invalido' });
      } else {
        this.setState({ emailError: '' });
      }
    } else {
      if (!checkPassword) {
        this.setState({ passwordError: 'A Senha dever ter mais de 5 caracteres' });
      } else {
        this.setState({ passwordError: '' });
        if (checkEmail) {
          this.setState({ btnEntrar: true });
        } else {
          this.setState({ btnEntrar: false });
        }
      }
    }
  }


  handleClick() {
    const { dispatchUserEmail } = this.props;
    const { email } = this.state;
    dispatchUserEmail(email);
  }

  render() {
    const { checkEmail, checkPassword, btnEntrar } = this.state;
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
            type='button'
            disabled={ btnEntrar }
            { ...console.log('estado do btn entrar ' + btnEntrar) }
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
