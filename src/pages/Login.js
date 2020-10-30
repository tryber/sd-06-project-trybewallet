import React from 'react';
import PropTypes from 'prop-types';
import '../css/Login.css';
import logo from '../images/logo.png';
import { actionCreators } from '../store/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    const { history } = this.props;
    return (
      <div className="login">
        <div className="login-container">
          <img
            src={ logo }
            alt="Logo"
            className="img-logo"
          />
          <input
            name="email"
            id="email"
            type="email"
            pattern="/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g"
            data-testid="email-input"
            onChange={ (e) => actionCreators.login(e.target.value) }
            required
          />
          Login
          <input
            name="password"
            id="password"
            type="password"
            minLength="6"
            data-testid="password-input"
            required
          />
          Password
          <button
            type="submit"
            onClick={ () => history.push('/carteira') }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
