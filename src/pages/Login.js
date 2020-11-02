import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.confirmarDados = this.confirmarDados.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logar = this.logar.bind(this);
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  confirmarDados() {
    const { email, password } = this.state;
    const caracterCentralEmail = '@';
    const usuario = email.substring(0, email.indexOf(caracterCentralEmail));
    const dominio = email
      .substring(email.indexOf(caracterCentralEmail) + 1, email.length);

    const caracterNaoExiste = -1;
    const tamanhoMinimoDominio = 3;
    const espasoVazio = ' ';
    const pontoEmail = '.';
    const minimoCaracteres = 6;
    if ((usuario.length >= 1)
      && (dominio.length >= tamanhoMinimoDominio)
      && (usuario.search(caracterCentralEmail) === caracterNaoExiste)
      && (dominio.search(caracterCentralEmail) === caracterNaoExiste)
      && (usuario.search(espasoVazio) === caracterNaoExiste)
      && (dominio.search(espasoVazio) === caracterNaoExiste)
      && (dominio.search(pontoEmail) !== caracterNaoExiste)
      && (dominio.indexOf(pontoEmail) >= 1)
      && (dominio.lastIndexOf(pontoEmail) < dominio.length - 1)
      && (password.length >= minimoCaracteres)) {
      this.setState({
        buttonDisabled: false,
      });
      return true;
    }
    this.setState({
      buttonDisabled: true,
    });
    return false;
  }

  logar(email) {
    const { saveEmail2, history } = this.props;
    saveEmail2(email);
    history.push('/carteira');
  }

  handleSubmit({ target }) {
    const { value, placeholder } = target;
    this.setState({
      [placeholder]: value,
    }, () => this.confirmarDados());
  }

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="email"
          data-testid="email-input"
          onChange={ this.handleSubmit }
          value={ email }
        />
        <input
          type="password"
          placeholder="password"
          data-testid="password-input"
          onChange={ this.handleSubmit }
          value={ password }
        />
        <button
          type="button"
          onClick={ () => this.logar(email) }
          disabled={ buttonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail2: (email) => dispatch(saveEmail(email)),
});

// const mapStateToProps = (state) => ({
//   aleatorioText: state.listReducer.aleatorioText,
//   cadastrados: state.listReducer.cadastrados,
// });
Login.propTypes = {
  saveEmail2: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
