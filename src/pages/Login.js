import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user } from '../actions/actionsCreator';

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
  }

  handleEmailInput(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginChange(event) {
    event.preventDefault();

    const { email } = this.state;
    const { logIn, history } = this.props;

    logIn({ email });

    history.push('/carteira');
  }

  canBeSubmited() {
    const { email, password } = this.state;
    const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const minimumPasswordLength = 6;
    return checkEmail && password.length >= minimumPasswordLength;
  }

  render() {
    const active = this.canBeSubmited();
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleLoginChange }>
          <input
            type="email"
            value={ email }
            onChange={ this.handleEmailInput }
            placeholder="email"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            placeholder="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handlePasswordInput }
            minLength="6"
            required
          />
          <button
            disabled={ !active }
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
    logIn: ({ email }) => dispatch(user({ email })),
  };
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
