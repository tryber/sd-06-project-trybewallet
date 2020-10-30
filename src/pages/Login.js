import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import loginAction from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      redirect: false,
      isDisabled: true,
    };
  }

  handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      email: value,
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
    const regExValidator = '/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/gi';
    const isEmailValid = regExValidator.test(email);
    const isPassValid = password.length >= 6;
    (isEmailValid && isPassValid) ?
      this.setState({
        isDisabled: false,
      }) :
      this.setState({
        isDisabled: true,
      });
  }

  render() {
    const { email, redirect } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="user-email">
            E-mail:
            <input
              data-testid="email-input"
              id="user-email"
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
              id="user-password"
              type="password"
            />
          </label>
          <button type="submit">
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
