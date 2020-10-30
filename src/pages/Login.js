import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Login.css';
import logo from '../images/logo.png';
import { login } from '../actions';
import { actionCreators } from '../store/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
    };
    // this.isValid = this.isValid.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   this.setState({
  //     email: e.target.value,
  //   });
  // }

  // isValid() {
  //   const { email, password } = this.state;
  //   const minLength = 5;
  //   const validEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  //   const validPassword = (password.length > minLength);
  //   const loginIsValid = (validEmail && validPassword);
  //   return loginIsValid;
  // }

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
            type="email"
            data-testid="email-input"
            onChange={ (e) => actionCreators.login(e.target.value) }
          />
          Login
          <input
            type="password"
            data-testid="password-input"
          />
          Password
          <button
            type="button"
            onClick={ () => history.push('/carteira') }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
