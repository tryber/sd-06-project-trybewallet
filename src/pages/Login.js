import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      password: '',
      buttonEnable: true,
    };
  }

  emailValidation(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  passwordValidation(password) {
    const passwordSize = password.length;
    const number = 6;
    if (passwordSize >= number) {
      return true;
    }
    return false;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), (() => {
      const { password, email } = this.state;
      const passwordIsValid = this.passwordValidation(password);
      const emailIsValid = this.emailValidation(email);

      if (passwordIsValid && emailIsValid) {
        this.setState({ buttonEnable: false });
      } else {
        this.setState({ buttonEnable: true });
      }
    }));
  }

  handleClick() {
    const { loginAction, history } = this.props;
    const { email } = this.state;

    loginAction(email);
    history.push('/carteira');
  }

  render() {
    const { password, email, buttonEnable } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <br />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <br />
          <button
            type="button"
            disabled={ buttonEnable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.arrayOf().isRequired,
};

const MapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(login(email)) });

export default connect(null, MapDispatchToProps)(Login);
