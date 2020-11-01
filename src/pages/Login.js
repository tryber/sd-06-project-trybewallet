import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  verifyPassword(password) {
    const MINIMUM_LENGTH = 6;

    return password.length >= MINIMUM_LENGTH;
  }

  verifyEmail(email) {
    const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

    return emailPattern.test(email);
  }

  toggleButton() {
    const { password, email } = this.state;
    const correctPasswordPattern = this.verifyPassword(password);
    const correctEmailPattern = this.verifyEmail(email);

    if (correctPasswordPattern && correctEmailPattern) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    }, () => this.toggleButton());
  }

  render() {
    const { isDisabled } = this.state;

    return (
      <>
        <h2>Login</h2>
        <label htmlFor="email">
          Insira o email
          <input
            type="text"
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Insira a sua senha
          <input
            type="email"
            name="password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button type="submit" disabled={ isDisabled }>Entrar</button>
      </>
    );
  }
}

export default Login;
