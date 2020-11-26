import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { emailLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateData = this.validateData.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  validateData() {
    const { email, password } = this.state;
    const minPassChar = 6;
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validated = password.length >= minPassChar && emailExp.test(email);
    this.setState({ disabled: !validated });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateData());
  }

  handleClick() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
          <Link to="/carteira">
            <button type="button" disabled={ disabled } onClick={ this.handleClick }>
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(emailLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
