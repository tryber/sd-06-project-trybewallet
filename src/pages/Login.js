import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUsers } from '../actions';
import trybeWallet from '../imgs/trybeWallet.png';

class Login extends React.Component {
  constructor() {
    super();
    // Cria o estado aqui antes de mandar para store para que só envie
    //  com tudo preenchido e não sujar a store em caso de desistência do
    //   USER no meio do caminho.
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
    this.sendForm = this.sendForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validadorDeCampos = this.validadorDeCampos.bind(this);
  }

  // Criar 3 funções para: SUBMETER O Formulário, VALIDAR CAMPOS e Salvar os inputs no state
  sendForm(event) {
    event.preventDefault();
    const { dispatchEmail } = this.props;
    const { email } = this.state;
    dispatchEmail(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  validadorDeCampos() {
    const { email, password } = this.state;
    const minSize = 6;
    // .test() executa uma busca por uma correspondência entre  uma expressão regular e uma string(MDN)
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    this.setState({ isDisabled: !(password.length >= minSize && validEmail) });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validadorDeCampos();
    });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <img src={ trybeWallet } alt="Trybe logo" />
        Faça seu Login:
        <form onSubmit={ this.sendForm }>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(loginUsers(email)),
});

Login.propTypes = ({
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  dispatchEmail: propTypes.func.isRequired,

});

export default connect(null, mapDispatchToProps)(Login);
