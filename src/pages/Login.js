import React from 'react';
import PropTypes from 'prop-types';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
// import { actionCreators } from '../store/index';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.checkInputsValidity = this.checkInputsValidity.bind(this);
  }

  // Function to validate email and password with regex and length,
  // based on saving state and setting it.
  checkInputsValidity({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      // regex patter found at stackoverflow
      const emailValidation = (/\S+@\S+\.\S+/).test(email);
      const passwordValidation = 6;
      if (emailValidation && passwordValidation <= password.length) {
        return this.setState({ disabled: false });
      }
      return this.setState({ disabled: true });
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { emailSaving } = this.props;

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
            pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
            placeholder="email address"
            data-testid="email-input"
            value={ email }
            onChange={ this.checkInputsValidity }
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
            value={ password }
            onChange={ this.checkInputsValidity }
            required
          />
          Password
          <br />
          <Link to="/carteira">
            <button
              id="submitBtn"
              type="submit"
              disabled={ disabled }
              onClick={ () => emailSaving(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailSaving: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()

Login.propTypes = {
  emailSaving: PropTypes.func.isRequired,
};
