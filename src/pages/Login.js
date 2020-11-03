import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      isDisabled: true,
    };
  }

  handleChange(event) {
    event.preventDefault();
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.enableButton();
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    const { userLogin } = this.props;
    userLogin(email);
    this.setState({
      redirect: true,
    });
  }

  enableButton() {
    const { email, password } = this.state;
    const regExValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/gi;
    const isEmailValid = regExValidator.test(email);
    const validLength = 6;
    const isPassValid = (password.length > 0) ? password.length >= validLength : false;
    return this.setState({
      isDisabled: !(isEmailValid && isPassValid),
    });
  }

  render() {
    const { email, redirect, isDisabled } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="user-email">
            E-mail:
            <input
              data-testid="email-input"
              id="user-email"
              name="email"
              type="email"
              pattern="^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="user-password">
            Password:
            <input
              data-testid="password-input"
              minLength="6"
              name="password"
              onChange={ this.handleChange }
              id="user-password"
              type="password"
            />
          </label>
          <button type="submit" disabled={ isDisabled }>
            Entrar
          </button>
        </form>
        {redirect && <Redirect to="/carteira" />}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (e) => dispatch(loginAction(e)) });

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};
