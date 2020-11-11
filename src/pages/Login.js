import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../actions';

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
      console.log('esta funcionando');
    } else {
      this.setState({
        btnDisable: true,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { history, sendLogin } = this.props;
    sendLogin(email);
    // history.push('/carteira');
  }

  render() {
    const { email, btnDisable, senha } = this.state;
    return (
      <div>
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
        <button
          type="submit"
          data-testid="my-action"
          disabled={ btnDisable }
          onClick={ this.handleSubmit }
          className="btn"
        >
          <Link to="/carteira">
            Entrar
          </Link>
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

// login autenticar usuario, login logaut

/* ### Página de Login
1. Crie uma página inicial de login com os seguintes campos e características:

  * A rota para esta página deve ser ‘/’.
  * Você deve criar um local para que a pessoa usuária insira seu email e senha. Utilize o atributo `data-testid="email-input"` para o email e `data-testid="password-input"` para a senha.
  * Crie um botão com o texto ‘Entrar’.
  * Realize as seguintes verificações nos campos de email e senha, de modo que caso sejam falsas o botão fique desabilitado:
    * O email está no formato válido, como 'alguem@alguem.com'.
    * A senha possui 6 ou mais caracteres.
  * Salve o email no estado da aplicação, com a chave ***email***, assim que a pessoa usuária logar.
  * A rota deve ser mudada para '/carteira' após o clique no botão '**Entrar**'. */
