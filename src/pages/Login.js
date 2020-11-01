import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUser from '../actions/loginAction';

class Login extends Component {
  constructor() {
    super();

    this.checkEmailAndPassword = this.checkEmailAndPassword.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      email: '',
      senha: '',
      isValid: true,
    };
  }

  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.checkEmailAndPassword());
  }

  checkEmailAndPassword() {
    const { email, senha } = this.state;
    const six = 6;
    const verifyString = email.split('@');

    if (verifyString.length === 2 && verifyString[1].endsWith('.com')) {
      if (senha.split('').length >= six) {
        return this.setState({
          isValid: false,
        });
      }
    }

    return this.setState({
      isValid: true,
    });
  }

  render() {
    const { handleLogin } = this.props;
    const { isValid, email } = this.state;

    return (
      <div>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input"
            name="email"
            type="text"
            placeholder="Digite seu email"
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid="password-input"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            onChange={ this.handleInput }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => handleLogin(email) }
            disabled={ isValid }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(addUser(email)),
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
