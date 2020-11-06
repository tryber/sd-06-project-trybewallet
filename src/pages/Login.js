import React from 'react';
import logoCarteira from '../img/trybe-wallet.png';

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

    //validacao dos campos
    const regexEmailValidation = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const textEmailValidation = document.querySelector('#textEmailValidation');

    const textPasswordValidation = document.querySelector('#textPasswordValidation');
    const passwordLength = 5;

    if (email.match(regexEmailValidation)) {
      textEmailValidation.innerHTML = 'email válido!';
      textEmailValidation.style.color = 'green';
      if (password.length === 0) {
        textPasswordValidation.innerHTML = '';
        this.setState({ isValid: false });
      } else if (password.length < passwordLength) {
        textPasswordValidation.innerHTML = 'senha inválida!';
        textPasswordValidation.style.color = 'red';
        this.setState({ isValid: false });
      } else {
        textPasswordValidation.innerHTML = 'senha válida!';
        textPasswordValidation.style.color = 'green';
        this.setState({ isValid: true });
      }
    } else {
      textEmailValidation.innerHTML = 'email inválido!';
      textEmailValidation.style.color = 'red';
      this.setState({ isValid: false });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    historu.push('/carteira');
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
              data-testid="email-input"
              onChange={ (event) => this.getLoginData(event) }
            />
            <span id="textEmailValidation" />
            <input
              type="password"
              name="password"
              id="password"
              data-testid="password-input"
              onChange={ (event) => this.getLoginData(event) }
            />
            <span id="textPasswordValidation" />
            <button
              type="submit"
              disabled={ !isValid }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default Login;
