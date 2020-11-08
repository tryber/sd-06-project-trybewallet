import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions/actionsCreator';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    // this.canBeSubmitted = this.canBeSubmitted.bind(this);
  }

  handleEmailInput(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginChange(event) {
    if (!canBeSubmitted()) {
      event.preventDefault();
    } else {
      const { email, password } = this.state;
      const { logIn, history } = this.props;

      logIn({ email, password });
      history.push('/carteira');
    }
  }

  canBeSubmited() {
    const { email, password } = this.state;
    const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const minimumPasswordLength = 6;
    return checkEmail && password.length >= minimumPasswordLength;
  }

  render() {
    const isEnabled = this.canBeSubmited();
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleLoginChange }>
          <input
            type="email"
            value={ email.value }
            onChange={ this.handleEmailInput }
            placeholder="email"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            placeholder="password"
            data-testid="password-input"
            value={ password.value }
            onChange={ this.handlePasswordInput }
            minLength="6"
            required
          />
          <button
            disabled={ !isEnabled }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: ({ email }) => dispatch(loginAction({ email })),
  };
}

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
