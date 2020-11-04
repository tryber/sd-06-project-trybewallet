import React from 'react';
import PropTypes from 'prop-types';
import { actionCreators } from '../store/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.inputValidate();
  }

  inputValidate() {
    const { email, password } = this.state;
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
    const validPassword = (/.{5,}/).test(password);

    if (validEmail && validPassword === true) {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  submit() {
    const { history } = this.props;
    const { email } = this.state;
    actionCreators.login(email);
    history.push('/carteira');
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <button
          disabled={ disabled }
          onClick={ () => this.submit() }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
