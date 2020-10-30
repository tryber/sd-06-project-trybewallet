import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Login.css';
import signIn from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValidation: false,
      passwordValidation: false,
      buttonDisabled: true,
    };
    this.handleState = this.handleState.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleState({ target }) {
    const { name, value } = target;
    const regEx = {
      email: /^[_a-z0-9.-]+@[a-z0-9]+\.com/,
      password: /[a-z0-9]{6,}/,
    };
    const inputValidation = value.match(regEx[name]) !== null;
    this.setState({ [name]: value, [`${name}Validation`]: inputValidation },
      this.handleButton);
  }

  handleButton() {
    const { emailValidation, passwordValidation } = this.state;
    const buttonDisabled = (!emailValidation && !passwordValidation);
    this.setState({ buttonDisabled });
  }

  render() {
    const { loggin } = this.props;
    const { email, buttonDisabled } = this.state;
    const walletPath = buttonDisabled ? '#' : '/carteira';
    return (
      <div>
        <form className="form-login-page">
          <input
            type="text"
            name="email"
            className="input-box"
            data-testid="email-input"
            placeholder="Digite seu email aqui"
            onChange={ this.handleState }
          />
          <input
            type="text"
            name="password"
            className="input-box"
            data-testid="password-input"
            placeholder="Digite sua senha aqui"
            onChange={ this.handleState }
          />
          <Link to={ walletPath } className="link-button-box">
            <button
              type="button"
              className="button-box"
              disabled={ buttonDisabled }
              onClick={ () => loggin(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ loggin: (e) => dispatch(signIn(e)) });
export default connect(null, mapDispatchToProps)(Login);

Login.defaultProps = {
  loggin: {},
};

Login.propTypes = {
  loggin: PropTypes.objectOf(PropTypes.func),
};
