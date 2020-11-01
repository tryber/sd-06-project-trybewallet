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
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleInput({ value, name }) {
    this.setState({
      [name]: value,
    });
  }

  submitLogin(event) {
    event.preventDefault();
    const { email } = this.state;
    const { history, login } = this.props;
    history.push('/carteira');
    return login(email);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={ this.submitLogin }>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            placeholder="email"
            onChange={ ({ target }) => this.handleInput(target) }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            placeholder="password"
            onChange={ ({ target }) => this.handleInput(target) }
          />
          <button type="submit">ENTRAR</button>
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
