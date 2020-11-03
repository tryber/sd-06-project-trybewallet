import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addEmail } from '../actions/index';
import Logo from './images/trybeWallet.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      // password: '',
      // disableButton: true,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email } = this.state;
    const { sendEmail } = this.props;
    return (
      <div className="login-container">
        <img src={ Logo } alt="Logo Trybe" width="200px" />
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="Digite aqui o seu email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Digite aqui a sua senha"
        />
        <Link to="/carteira" onClick={ () => sendEmail(email) }>
          <button type="button">Entrar</button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
