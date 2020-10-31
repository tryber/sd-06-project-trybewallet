import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionLogin } from '../actions';
import Input from '../components/Input';
import './login.css';
import trybewallet from './trybeWallet.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verifyEmailAndPassword();
    });
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const passMinLength = 6;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    this.setState({ disabled: !(password.length >= passMinLength && emailFormat) });
  }

  handleClick(event) {
    const { login } = this.props;
    const { email } = this.state;
    event.preventDefault();
    login(email);
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="container">
        <form className="login">
          <img alt="trybe-logo" src={ trybewallet } width="200px" />
          <Input
            testId="email-input"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <Input
            testId="password-input"
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="submit"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(actionLogin(e)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
