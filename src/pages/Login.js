import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleLogin(event) {
    event.preventDefault();
    const { history, saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    history.push('carteira');
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      const { email, password } = this.state;
      const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
      // test () - testa uma correspondência em uma string.Este método retorna verdadeiro se encontrar uma correspondência, caso contrário, retorna falso.
      const checkPassword = 6;
      if (password.length >= checkPassword && checkEmail) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleLogin }>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            placeholder="Digite seu e-mail"
            required
            value={ email }
            onChange={ this.handleChange }
          />
          <br />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            required
            value={ password }
            onChange={ this.handleChange }
          />
          <br />
          <button
            type="submit"
            disabled={ disabled } // impede que um usuário clique no botão até que alguma outra condição seja atendida
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(login(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
