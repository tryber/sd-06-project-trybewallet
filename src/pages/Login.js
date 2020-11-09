import React from 'react';
import PropTypes from 'prop-types';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
// import { actionCreators } from '../store/index';
import { login } from '../actions';

// Página em que são renderizados o formulário de login.

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.checkInputsValidity = this.checkInputsValidity.bind(this);
  }

  // Função usada para validar o email e password com regex e comprimento, baseada em // // salvar o estado e setá-lo.
  checkInputsValidity({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      // Padrão de regex encontrado no stackoverflow.
      const emailValidation = (/\S+@\S+\.\S+/).test(email);
      const passwordValidation = 6;
      if (emailValidation && passwordValidation <= password.length) {
        return this.setState({ disabled: false });
      }
      return this.setState({ disabled: true });
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { emailSaving } = this.props;

    return (
      <div className="login">
        <div className="login-container">
          <img
            src={ logo }
            alt="Logo"
            className="img-logo"
          />
          <input
            name="email"
            id="email"
            type="email"
            placeholder="email address"
            data-testid="email-input"
            value={ email }
            onChange={ this.checkInputsValidity }
            required
          />
          Login
          <input
            name="password"
            id="password"
            type="password"
            data-testid="password-input"
            placeholder="password"
            value={ password }
            onChange={ this.checkInputsValidity }
            required
          />
          Password
          <br />
          <Link
            to="/carteira"
          >
            <button
              id="submitBtn"
              type="submit"
              disabled={ disabled }
              onClick={ () => emailSaving(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailSaving: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()

Login.propTypes = {
  emailSaving: PropTypes.func.isRequired,
};
