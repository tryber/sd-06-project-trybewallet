import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleLogin from '../actions/Login';
import loginData from '../assets/dummyLogin';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      email: '',
      password: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidUpdate(_prevprops, prevState) {
    const { email, password } = this.state;
    if (prevState.password !== password) this.validateInputs(password, email);
  }

  handleChange({ value, name }) {
    this.setState({ [name]: value });
  }

  validateEmail(emailInput) {
    const emailMatcher = (/^[a-z0-9]+@[a-z0-9]+\.+[a-z]+(\.[a-z]+)?$/i);
    return emailMatcher.test(emailInput);
  }

  validateInputs(passInput, emailInput) {
    const minPassLength = 6;
    if (passInput.length >= minPassLength
       && (this.validateEmail(emailInput))) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  }

  login(userPass, userEmail) {
    const { handleClick } = this.props;
    if (userEmail === loginData.email
      && userPass === loginData.password) {
      handleClick(userEmail);

      return true;
    }

    return false;
  }

  render() {
    const { email, password, isValid } = this.state;

    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            placeholder="email"
            onChange={ (e) => this.handleChange(e.target) }
            value={ email }
          />

          <input
            data-testid="password-input"
            type="text"
            placeholder="password"
            name="password"
            onChange={ (e) => this.handleChange(e.target) }
            value={ password }
          />
        </form>

        <Link to="/carteira">
          <button
            disabled={ !isValid }
            type="button"
            onClick={
              () => this.login(password, email)
            }
          >
            Entrar
          </button>

        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (email) => (
    dispatch(handleLogin(email))
  ),
});

Login.propTypes = {
  handleClick: PropTypes.func,

};

Login.defaultProps = {
  handleClick: () => {},
};

export default connect(null, mapDispatchToProps)(Login);
