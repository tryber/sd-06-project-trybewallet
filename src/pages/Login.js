import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ' ',
      password: ' ',
      isValid: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      this.validateInputs();
    });
  }

  onSubmit() {
    const { email } = this.state;
    const { handleLogin, history } = this.props;
    handleLogin(email);
    history.push('/carteira');
  }

  validateInputs() {
    const { email, password } = this.state;
    const EMAIL_REGEX = RegExp(/^[\w-.]+@(([\w-]+.)+[\w-]{2,4})$/g).test(email);
    const PASS_VALIDATION = 6;
    this.setState({
      isValid: EMAIL_REGEX && password.length >= PASS_VALIDATION,
    });
  }

  render() {
    const { isValid } = this.state;
    return (
      <div>
        <form>
          <input
            name="email"
            type="email"
            data-testid="email-input"
            id="email-input"
            placeholder="your@email.com"
            onChange={ (e) => this.onChange(e) }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={ (e) => this.onChange(e) }
          />
          <button
            type="button"
            id="login-button"
            disabled={ !isValid }
            onClick={ this.onSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (data) => dispatch(login(data)),
});

export default connect(null, mapDispatchToProps)(Login);
