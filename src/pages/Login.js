import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabledButton: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.inputValidations = this.inputValidations.bind(this);
  }

  handleInput({ value, name }) {
    this.setState({
      [name]: value,
    },
    () => {
      this.inputValidations();
    });
  }

  inputValidations() {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
    const lengthMinPassword = 5;

    this.setState({
      disabledButton: (emailRegex.test(email) && password.length > lengthMinPassword),
    });
  }

  submitLogin(event) {
    event.preventDefault();
    const { email, disabledButton } = this.state;
    const { history, login } = this.props;
    if (disabledButton) {
      console.log('state atual disableButton:', disabledButton);
      history.push('/carteira');
      return login(email);
    }
  }

  render() {
    const { email, password, disabledButton } = this.state;
    return (
      <div>
        <form onSubmit={ this.submitLogin }>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            placeholder="email"
            onChange={ ({ target }) => this.handleInput(target) }
            required
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            placeholder="password"
            onChange={ ({ target }) => this.handleInput(target) }
            required
          />
          <button disabled={ !disabledButton } type="submit">ENTRAR</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email) => dispatch(loginAction(email)),
  };
}

Login.propTypes = {
  email: PropTypes.string,
  login: PropTypes.func.isRequired,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
