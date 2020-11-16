// 1. Crie uma página inicial de login com os seguintes campos e características:
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionsEmailLogin, savePassword } from '../actions';
import './PagesCss.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
  }

  // Função que verifica formato do e-mail (.com) e senha de 6 dígitos
  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const passwordMinLength = 6;

    this.setState({ isDisabled: !(password.length >= passwordMinLength && emailFormat) });
  }

  // Função que confirma verificação para habilitar butão "Entrar", dispacha, salva email e password
  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.verifyEmailAndPassword();
    });

    const { password } = this.state;
    const { dispatchSavePassword } = this.props;
    dispatchSavePassword(password);

    const { email } = this.state;
    const { dispatchSaveEmail } = this.props;
    dispatchSaveEmail(email);
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <div className="login-css">
        <h1>Login</h1>
        <form className="form-css">
          <input
            type="text"
            value={ email }
            placeholder="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
          />
          <p />
          <input
            type="password"
            value={ password }
            data-testid="password-input"
            placeholder="password"
            name="password"
            maxLength="6"
            onChange={ this.handleChange }
          />
          <p />
          <Link to="/carteira">
            <button
              className="css-button"
              type="submit"
              onClick={ this.handleChange }
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

// Props Validation
Login.propTypes = {
  dispatchSaveEmail: PropTypes.func.isRequired,
  dispatchSavePassword: PropTypes.func.isRequired,
};

// mapDispatchToProps = dispacha ação para o reducer através da action
const mapDispatchToProps = (dispatch) => ({
  dispatchSaveEmail: (email) => dispatch(actionsEmailLogin(email)),
  dispatchSavePassword: (password) => dispatch(savePassword(password)),
});

// connect = acessa store do Redux
export default connect(null, mapDispatchToProps)(Login);
