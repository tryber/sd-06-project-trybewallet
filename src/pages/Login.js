import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoginUser } from '../actions';
import '../styles/Login/style.css'

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonValidation = this.buttonValidation.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  buttonValidation() {
    const MAGIC_NUMBER = 5;
    const em = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const { email, password } = this.state;
    if (em.test(email) && password.length >= MAGIC_NUMBER) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatchData, history } = this.props;
    const { email } = this.state;
    dispatchData(email);
    history.push('/carteira');
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
    this.buttonValidation();
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="login">
        <form>
          <img src="http://phellipecode.me/landingpage/images/logo.png" alt="logotipo" />
          <input
            type="email"
            value={ email }
            onChange={ this.handleChange }
            name="email"
            placeholder="E-mail"
            data-testid="email-input"
          />
          <input
            type="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Senha"
            name="password"
            data-testid="password-input"
          />
          <button
            type="button"
            onClick={ this.handleSubmit }
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchData: (nome) => {
    dispatch(LoginUser(nome));
  },
});

Login.propTypes = {
  dispatchData: PropTypes.func,
  history: PropTypes.object,
};

Login.defaultProps = {
  dispatchData: '',
  history: '/',
};

export default connect(null, mapDispatchToProps)(Login);
