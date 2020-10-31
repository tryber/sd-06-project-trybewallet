import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';
import './login.css';
import logo from '../images/logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.validation = this.validation.bind(this);
  }

  validation({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const emailExpRegular = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
      const numberMinimoCaracterSenha = 6;
      return this.setState({
        disabled:
        !((password.length >= numberMinimoCaracterSenha)
        && (emailExpRegular.test(email))) });
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { formLogin } = this.props;

    return (
      <div className="form-login">
        <form>
          <img
            src={ logo }
            alt="logo-trybe"
          />
          <label
            htmlFor="email"
          >
            E-mail
            <input
              data-testid="email-input"
              id="email"
              name="email"
              type="text"
              value={ email }
              placeholder="exemplo@gmail.com"
              required
              onChange={ this.validation }
            />
          </label>
          <br />
          <label
            htmlFor="password"
          >
            Senha
            <input
              data-testid="password-input"
              id="password"
              name="password"
              type="password"
              minLength="6"
              value={ password }
              required
              onChange={ this.validation }
            />
          </label>
          <br />
          <Link to="/carteira">
            <button
              disabled={ disabled }
              type="submit"
              onClick={ () => formLogin(email) }
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
  formLogin: (data) => dispatch(login(data)),
});

Login.propTypes = {
  formLogin: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
