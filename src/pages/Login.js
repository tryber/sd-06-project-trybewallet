import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { salveUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.changeSalve = this.changeSalve.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: false,
    };
  }

  validateInputs() {
    const { email, password } = this.state;
    const minLength = 5;
    const emailValidation = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    this.setState({
      disabled: (password.length >= minLength) && (emailValidation.test(email)),
    });
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    this.validateInputs();
  }

  changeSalve() {
    const { email } = this.state;
    const { salveEmail } = this.props;
    salveEmail(email);
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div>
        <form>
          <div>
            <label htmlFor="email">
              Email:
              <input
                data-testid="email-input"
                placeholder="Digite seu email"
                name="email"
                id="email"
                type="email"
                value={ email }
                onChange={ this.handleInputChange }
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Senha
              <input
                data-testid="password-input"
                placeholder="Digite sua senha"
                id="password"
                type="password"
                minLength="6"
                name="password"
                value={ password }
                onChange={ this.handleInputChange }
                required
              />
            </label>
          </div>
          <div>
            <Link to="/carteira">
              <button
                type="submit"
                onClick={ this.changeSalve }
                disabled={ !disabled }
              >
                Entrar
              </button>
            </Link>
          </div>
        </form>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  salveEmail: (email) => dispatch(salveUserEmail(email)),
});

Login.propTypes = {
  addEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
