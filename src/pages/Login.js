import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userLogin from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isDisabled: true,
      email: '',
    };
  }

  handleChange() {
    const loginPassword = document.getElementById('login-password').value.length;
    const loginEmail = document.getElementById('login-email').value;
    const validation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const six = 6;
    if (validation.test(loginEmail) === true && loginPassword >= six) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    this.setState({ email: loginEmail });
  }

  handleClick(e) {
    e.preventDefault();
    const { userSave, history } = this.props;
    const { email } = this.state;
    userSave(email);
    history.push('/carteira');
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <label htmlFor="email">
          E-Mail:
          <input
            name="email"
            id="login-email"
            data-testid="email-input"
            type="text"
            pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
            required
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="login-password"
            name="password"
            data-testid="password-input"
            type="password"
            minLength="6"
            required
            onChange={ this.handleChange }
          />
        </label>
        <button
          id="button-login"
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userSave: (userEmail) => dispatch(userLogin(userEmail)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userSave: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
