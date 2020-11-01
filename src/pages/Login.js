import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

import Header from '../components/Header';

import logoCarteira from '../img/trybe-wallet.png';
import './loginstyle.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };

    this.getLoginData = this.getLoginData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getLoginData({ target }) {
    this.setState({ [target.name]: target.value });
    const { email, password } = this.state;
    // é necessário validar o email e senha:
    const toValidateEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const validationEmailText = document.querySelector('#validationEmailText');

    const validationPasswordText = document.querySelector('#validationPasswordText');
    const MIN_PASSWORD_LENGTH = 5;

    if (email.match(toValidateEmail)) {
      validationEmailText.innerHTML = 'email válido!';
      validationEmailText.style.color = 'green';
      if (password.length === 0) {
        validationPasswordText.innerHTML = '';
        this.setState({ isValid: false });
      } else if (password.length < MIN_PASSWORD_LENGTH) {
        validationPasswordText.innerHTML = 'senha inválida!';
        validationEmailText.style.color = 'red';
        this.setState({ isValid: false });
      } else {
        validationPasswordText.innerHTML = 'senha válida!';
        validationEmailText.style.color = 'green';
        this.setState({ isValid: true });
      }
    } else {
      validationEmailText.innerHTML = 'email inválido!';
      validationEmailText.style.color = 'red';
      this.setState({ isValid: false });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { isValid } = this.state;
    return (
      <>
        <Header titulo="planeje sua viagem!" />
        <div className="login-box">
          <img src={ logoCarteira } alt="logo da TrybeWallet" />
          <form>
            <input
              type="email"
              name="email"
              id="email"
              onChange={ (event) => this.getLoginData(event) }
              data-testid="email-input"
            />
            <p id="validationEmailText" />
            <input
              type="password"
              name="password"
              id="password"
              onChange={ (event) => this.getLoginData(event) }
              data-testid="password-input"
            />
            <p id="validationPasswordText" />
            <button
              type="submit"
              onClick={ this.handleClick }
              disabled={ !isValid }
            >
              Entrar
            </button>
          </form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
