import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.isEmail = this.isEmail.bind(this);
    this.isPassword = this.isPassword.bind(this);
  }

  isEmail(e) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { value } = e.target;
    if (emailRegex.test(value)) {
      this.setState({
        email: value,
      });
    } else {
      this.setState({
        email: '',
      });
    }
  }

  isPassword(e) {
    const magicNumber = 6;
    if (e.target.value.length >= magicNumber) {
      // console.log('validado')
      this.setState({
        password: e.target.value,
      });
    } else {
      this.setState({
        password: '',
      });
    }
  }

  render() {
    const x = false;
    const y = true;
    const { loginN } = this.props;
    const { email, password } = this.state;
    return (
      <div className="login-box">
        <div className="header-from">
          <h2>Trybe Wallet</h2>
        </div>
        <div className="form">
          <label className="label-email" htmlFor="email-input">
            Email
            <input
              id="email-input"
              type="email"
              data-testid="email-input"
              onChange={ this.isEmail }
              placeholder="Digite aqui seu email"
            />
          </label>
          <label className="label-password" htmlFor="pass-input">
            Senha
            <input
              id="pass-input"
              type="password"
              data-testid="password-input"
              onChange={ this.isPassword }
              placeholder="Digite aqui sua senha"
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              id="join-button"
              onClick={ () => loginN(email) }
              disabled={ email !== '' && password !== '' ? x : y }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginN: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginN: (email) => dispatch(login(email)),
});

export default connect(
  null, mapDispatchToProps,
)(Login);
