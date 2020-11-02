import React from 'react';
import PropTypes from 'prop-types';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { actionCreators } from '../store/index';

class Login extends React.Component {
  // constructor() {
  //   super();

  //   this.checkInputsValidity = this.checkInputsValidity.bind(this);
  // }

  // checkInputsValidity() {
  //   const form = document.getElementById('form');
  //   const submitBtn = document.getElementById('submitBtn');
  //   if (!form.checkValidity()) {
  //     return submitBtn.disabled;
  //   }
  // }

  render() {
    return (
      <div className="login">
        <div className="login-container">
          <img
            src={ logo }
            alt="Logo"
            className="img-logo"
          />
          {/* <form id="form"> */}
          <input
            name="email"
            id="email"
            type="email"
            pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
            placeholder="email address"
            data-testid="email-input"
            // onChange={ (e) => actionCreators.login(e.target.value) }
            required
          />
          Login
          <input
            name="password"
            id="password"
            type="password"
            minLength="6"
            data-testid="password-input"
            placeholder="password"
            required
          />
          Password
          <br />
          <Link to="/carteira">
            <button
              id="submitBtn"
              type="submit"
              // onChange={ this.checkInputsValidity() }
              onClick={ () => {
                const emailInput = document.getElementById('email');
                actionCreators.login(emailInput.value);
              } }
            >
              Entrar
            </button>
          </Link>

          {/* </form> */}

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
