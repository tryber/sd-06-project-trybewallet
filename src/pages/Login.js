import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValidation: false,
      passwordValidation: false,
      buttonActived: false,
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
    const buttonActived = (emailValidation && passwordValidation);
    this.setState({ buttonActived });
  }

  render() {
    const { loggin } = this.props;
    const { email, password, buttonActived } = this.state;
    const walletPath = buttonActived ? '/carteira' : '#';
    return (
      <div>
        <form className="form-login-page">
          <input
            type="text"
            name="email"
            className="input-box"
            data-testid="email-input"
            placeholder="Digite seu email aqui"
            value={ email }
            onChange={ this.handleState }
          />
          <input
            type="text"
            name="password"
            className="input-box"
            data-testid="password-input"
            placeholder="Digite sua senha aqui"
            value={ password }
            onChange={ this.handleState }
          />
          <Link to={ walletPath } className="link-button-box">
            <button
              type="button"
              className="button-box"
              disabled={ !buttonActived }
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
}

Login.propTypes = {
  loggin: PropTypes.objectOf(PropTypes.string),
};
