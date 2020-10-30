import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.validateFields = this.validateFields.bind(this);
    this.HandleClickRedirect = this.HandleClickRedirect.bind(this);

    this.state = {
      email: '',
      password: '',
      enable: false,
    };
  }

  validateFields() {
    const { email, password } = this.state;
    const minLength = 4;
    const validEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const validPassword = (password.length >= minLength);
    const loginIsValid = (validEmail && validPassword);
    if (loginIsValid) return this.setState({ enable: true });
  }

  HandleClickRedirect() {
    const { enable } = this.state;
    if (enable) return '/carteira';
  }

  render() {
    // const { email, password } = this.state;
    return (
      <section className="login-container">
        <h1>Login</h1>
        <input
          data-testid="email-input"
          required
          type="email"
          name="email"
          placeholder=" Dígite seu email"
          onChange={ ({ target: { value } }) => this.setState({ email: value }) }
        />
        <input
          data-testid="password-input"
          required
          type="password"
          name="password"
          placeholder=" Senha"
          onChange={ ({ target: { value } }) => {
            this.setState({ password: value });
            return this.validateFields();
          } }
        />
        <Link className="btn" to={ this.HandleClickRedirect }>Entrar</Link>
      </section>
    );
  }
}

export default Login;
