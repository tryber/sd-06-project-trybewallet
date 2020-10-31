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
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { login } = this.props;
    const { email } = this.state;
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
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => login(email) }
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
