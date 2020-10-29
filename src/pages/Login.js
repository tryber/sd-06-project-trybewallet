import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="text"
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
          <button type="button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
