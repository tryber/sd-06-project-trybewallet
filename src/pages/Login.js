import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionLogin } from '../actions';
import Input from '../components/Input';
import './login.css';
import trybewallet from './trybeWallet.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.verifyEmailAndPassword();
      },
    );
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const passMinLength = 6;
    const emailFormat = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (password.length >= passMinLength && emailFormat.test(email)) {
      return this.setState({
        isValid: true,
      });
    }
    return this.setState({
      isValid: false,
    });
  }
  // Alterando conforme explicação do Thaydds na thread do forna no slack(usar withrouter pois link aninhado em button não é um html válido)

  handleClick() {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { isValid } = this.state;
    return (
      <div className="container">
        <form className="login">
          <img alt="trybe-logo" src={ trybewallet } width="200px" />
          <Input
            testId="email-input"
            name="email"
            type="email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
          <Input
            testId="password-input"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
          <button type="button" disabled={ !isValid } onClick={ this.handleClick }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(actionLogin(e)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
