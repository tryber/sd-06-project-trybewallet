import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import addEmailUser from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isValidPassword: false,
      isValidLogin: false,
      validateButton: false,
      password: '',
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  // componentDidUpdate() {
  //   this.handleWithLoginButton();
  // }

  /* O regex usado nesta função foi retirado do site:
  https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail */

  validateEmail(email) {
    const inputEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (inputEmail.test(email)) {
      return this.setState({
        email,
        isValidLogin: true,
      });
    }
  }

  validatePassword(password) {
    const inputPasswordLenght = 6;
    if (password.length >= inputPasswordLenght) {
      this.setState({ isValidPassword: true });
    }
  }

  handleWithLoginButton() {
    const { isValidPassword, isValidLogin, validateButton, email, password } = this.state;
    const buttonLogin = document.getElementById('button-login');
    if (isValidLogin === true
      && isValidPassword === true) {
      // buttonLogin.disabled = false;
      this.setState({ validateButton: true });
    }
    // const inputEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const inputPasswordLenght = 6;
    // this.setState({ validateButton: inputEmail.test(email) && password.length >= inputPasswordLenght });
  }

  handleLogin() {
    const { email } = this.state
    this.props.login({email})
    this.props.history.push('/carteira')
  }

  render() {
    const { email } = this.state;
    const { login } = this.props;
    console.log(email);
    return (
      <div>
        <input
          type="text"
          data-testid="email-input"
          placeholder="digite seu email"
          onChange={ (e) => this.validateEmail(e.target.value) }
        />
        <input
          type="text"
          data-testid="password-input"
          placeholder="digite sua senha"
          onChange={ (e) => this.validatePassword(e.target.value) }
        />
        <Link to="/carteira">
          <input
            type="button"
            id="button-login"
            value="Entrar"
            disabled={ !(this.state.isValidLogin && this.state.isValidPassword) }
            onClick={ () => this.handleLogin() }
          />
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(addEmailUser(e)),
});

export default connect(null, mapDispatchToProps)(Login);
