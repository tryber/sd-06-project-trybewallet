import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndPassword = this.validateEmailAndPassword.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validateEmailAndPassword();
    });
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;
    // Reference to email regex: https://regexr.com/3e48o, need to delete '\.', because of the lint;
    const emailPattern = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    const minLength = 6;
    this.setState({
      isValid: emailPattern.test(email) && password.length >= minLength,
    });
  }

  render() {
    const { login } = this.props;
    const { email, isValid } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="seuemail@email.com"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Senha"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => login(email) }
            disabled={ !isValid }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispacthToProps = (dispatch) => ({
  login: (username) => dispatch(startLogin(username)) });

export default connect(null, mapDispacthToProps)(Login);
