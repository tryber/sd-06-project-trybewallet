import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from '../actions';
import Wallet from '../img/wallet.jpg';

class Login extends React.Component {
  constructor() {
    super();

    this.passwordValidation = this.passwordValidation.bind(this);
    this.emailValidation = this.emailValidation.bind(this);

    this.state = {
      email: '',
      emailValidate: false,
      passwordValidate: false,
    };
  }

  passwordValidation(password) {
    let passwordValidate = false;
    const rule = 6;
    if (password.length >= rule) {
      passwordValidate = true;
    }
    this.setState({
      passwordValidate,
    });
  }

  emailValidation(email) {
    let emailValidate = false;
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (re.test(email.toLowerCase())) {
      emailValidate = true;
    }
    this.setState({
      email,
      emailValidate,
    });
  }

  render() {
    const { email, emailValidate, passwordValidate } = this.state;
    const { saveUser } = this.props;
    return (
      <div className="containerLogin">
        <form>
          <div className="walletLogo">
            <img src={ Wallet } alt="Wallet" width="100" height="100" />
          </div>
          <div>
            <input
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={ (e) => this.emailValidation(e.target.value) }
            />
          </div>
          <div>
            <input
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={ (e) => this.passwordValidation(e.target.value) }
            />
          </div>
          <div>
            <Link to="/carteira">
              <button
                type="button"
                disabled={ !(emailValidate && passwordValidate) }
                onClick={ () => saveUser(email) }
              >
                Entrar
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = { saveUser: PropTypes.func.isRequired };
