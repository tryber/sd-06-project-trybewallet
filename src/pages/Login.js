import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import setEmailForm from '../actions';

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
  }

  validateFields() {
    const { email, password } = this.state;
    const minPasswordLength = 6;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

    if (emailFormat && password.length > minPasswordLength) {
      this.setState({ isDisabled: false });
    }
  }

  handleInput({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validateFields();
    });
  }

  // handleLogin() {
  //   if (validateEmail() === true && validatePassword() === true) {
  //     return false;
  //   }
  // }

  render() {
    const { email, password, isDisabled } = this.state;
    const { setEmail } = this.props;
    return (
      <div>
        <form>
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
            type="text"
            value={ password }
            name="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={ this.handleInput }
            minLength="6"
            required
          />
          <button
            type="button"
            onClick={ () => setEmail(this.state) }
            disabled={ isDisabled }
          >
            <Link to="/carteira">Entrar</Link>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmailForm(email)),
});

Login.propTypes = {
  setEmail: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
