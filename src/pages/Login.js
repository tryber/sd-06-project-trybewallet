import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../actions/getEmail';
import trybeWallet from '../images/trybe_wallet.png';
import '../style/Login.css';

class Login extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleSubmit(event) {
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
      <div className="div_login">
        <form className="form_login">
          <img className="image_wallet" src={ trybeWallet } alt="Logo Trybe Wallet" />
          <input
            className="input_login"
            data-testid="email-input"
            type="text"
            name="email"
            placeholder="Digite seu e-mail"
            required
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            className="input_login"
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            required
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            className="button_login"
            type="submit"
            disabled={ disabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
