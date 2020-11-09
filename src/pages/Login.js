import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonDisabled: false,
    };
  }

  handleInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    this.validateInputs();
  }

  validateInputs() {
    const { email, password } = this.state;

    const emailValidation = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email);
    const minLength = 5;

    this.setState({
      buttonDisabled: password.length >= minLength && emailValidation,
    });
  }

  render() {
    const { email, password, buttonDisabled } = this.state;

    return (
      <div className="container">
        <form>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={ email }
                placeholder="Digite o seu email"
                data-testid="email-input"
                onChange={ this.handleInputChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Senha:
              <input
                type="password"
                id="password"
                name="password"
                value={ password }
                placeholder="Digite a sua senha"
                data-testid="password-input"
                onChange={ this.handleInputChange }
              />
            </label>
          </div>
          <div>
            <Link to="/carteira">
              <input
                type="submit"
                disabled={ !buttonDisabled }
                value="Entrar"
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
