import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import setEmailForm from '../actions';
// import trybeWallet from '../img/trybeWallet';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleInput = this.handleInput.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  validateFields() {
    const { email, password } = this.state;
    const minPasswordLength = 6;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

    if (emailFormat && password.length >= minPasswordLength) {
      this.setState({ isDisabled: false });
    } else this.setState({ isDisabled: true });
  }

  handleInput({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validateFields();
    });
  }

  handleLogin(event) {
    event.preventDefault();
    const { setEmail } = this.props;
    const { email } = this.state;
    setEmail(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="login">
        <form onSubmit={ this.handleLogin }>
          <input
            type="email"
            value={ email }
            name="email"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleInput }
            required
          />
          <input
            type="password"
            value={ password }
            name="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={ this.handleInput }
            required
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

const mapStateToProps = (state) => ({
  user: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (userEmail) => dispatch(setEmailForm(userEmail)),
});

Login.propTypes = {
  setEmail: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
