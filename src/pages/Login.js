import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      senha: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { email, senha } = this.state;
    const regexp = /^[a-zA-Z0-9.!#$%&_-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    this.setState({ [name]: value }, () => {
      let disabled = true;
      let five = 5;

      if (regexp.test(email) && senha.length >= five) disabled = false;

      this.setState({ disabled });
    });
  }

  render() {
    const { disabled } = this.state;

    return (
      <section>
        <label htmlFor="email-input">
          Email:
          <input
            required
            data-testid="email-input"
            placeholder="email@email.com"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            required
            data-testid="password-input"
            placeholder="senha"
            name="senha"
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" disabled={ disabled }>Entrar</button>
      </section>
    );
  }
}

export default Login;
