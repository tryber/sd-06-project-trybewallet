import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
  }

  handleLogin() {
    console.log('clicou', this.props);
    const { email } = this.state;
    const { add } = this.props;
    add(email);
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const magic = 5;
    const isValid = email.match(/\S+@\S+\.\S+/);
    if (password.length > magic && isValid) {
      return true;
    }
  }

  render() {
    const { email, password } = this.state;
    const activeBtn = this.verifyEmailAndPassword();

    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onSubmit={ (event) => this.setState({ email: event.target.value }) }
            placeholder="alguem@alguem.com"
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onSubmit={ (event) => this.setState({ password: event.target.value }) }
            placeholder="123456...¯\_(ツ)_/¯"
          />
        </label>
        <br />
        <Link to="/carteira">
          <button
            disabled={ !activeBtn }
            type="button"
            onClick={ () => this.handleLogin() }
          >
            Entrar
          </button>
        </Link>
      </div>);
  }
}

Login.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
