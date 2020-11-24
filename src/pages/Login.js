import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';
// import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      btnDisable: true,
      email: '',
      senha: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target: { name, value } }) {
    this.setState(
      {
        [name]: value,
      },
      () => this.validateInputs(),
    );
  }

  validateInputs() {
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('password-input').value;
    const regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const tamMinimSenha = 6;
    if (senha.length === tamMinimSenha && regex.test(email)) {
      this.setState({
        btnDisable: false,
        email,
        senha,
      });
    } else {
      this.setState({
        btnDisable: true,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { sendLogin, history } = this.props;
    sendLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, btnDisable, senha } = this.state;
    return (
      <div className="container">
        <div className="name-login">
          <label htmlFor="email-input">
            Email:
            <input
              id="email-input"
              type="email"
              name="email"
              data-testid="email-input"
              placeholder="E-mail"
              required
              onChange={ this.handleInput }
              value={ email }
            />
          </label>
        </div>
        <div className="login-box">
          <label htmlFor="password">
            Senha:
            <input
              id="password-input"
              type="password"
              name="senha"
              data-testid="password-input"
              placeholder="senha"
              required
              onChange={ this.handleInput }
              value={ senha }
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="my-action"
          disabled={ btnDisable }
          onClick={ this.handleSubmit }
          className="btn"
        >
          Entrar
        </button>
      </div>
    );
  }
}
// tudo dentro do mapDispatch são  funções - que  pode ter  parametro ou não.
// (parametro) => dispatch (action) - estrutura básica

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (email) => dispatch(login(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  btnDisable: PropTypes.bool.isRequired,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
