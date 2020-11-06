import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.validatePassword();
  }

  handleSubmit(event) {
    this.setState({
      email: event.target.value,
      password: event.target.value,
    });
  }

  validatePassword() {
    const button = document.querySelectorAll('button');
    if (this.state.password.length < 6) {
      button.className += ' hidden';
    } else {
      button.className += ' show';
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="email"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            required
          />
        </label>
        <button onClick={ this.handleSubmit } type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
