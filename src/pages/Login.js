import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: false,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.validateLogin();
  }

  validateLogin() {
    const NUM_PASSWORD = 5;
    const { email, password } = this.state;
    this.setState({ disabled:
      ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        .test(email))
      && password.length >= NUM_PASSWORD) });
  }

  render() {
    const { userLogin } = this.props;
    const { disabled } = this.state;
    const { email } = this.state;
    return (
      <div>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="Digite seu email"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !disabled }
            onClick={ () => userLogin(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(login(email)) });

export default connect(null, mapDispatchToProps)(Login);
