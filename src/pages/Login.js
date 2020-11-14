import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      // isDisabled: true,
    };
    // bind
    this.handleOnChange = this.handleOnChange.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
  }
  
  handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( { [name]: value })
  };

  buttonSubmit() {
    const { email } = this.state;
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <input
          type="email"
          name="email"
          onChange={this.handleOnChange}
          data-testid="email-input"
          placeholder="e-mail"
          minlength="6"
          required
        />

        <input
          type="password"
          name="password"
          onChange={this.handleOnChange}
          data-testid="password-input"
          placeholder="senha"
          minlength="6"
          required
        />

        <Link to="/carteira">
          <button
            type="submit"
            // disabled={isDisabled}
            onClick={this.buttonSubmit}
          >
            Entrar
          </button>
        </Link>

      </div>
    )
  }
}

export default Login;
