import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validateFields = this.validateFields.bind(this);
    this.HandleLinkRedirect = this.HandleLinkRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      enable: false,
    };
  }

  validateFields() {
    const { email, password } = this.state;
    const minLength = 5;
    const validEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const validPassword = (password.length >= minLength);
    const loginIsValid = (validEmail && validPassword);
    if (loginIsValid) return this.setState({ enable: true });
  }

  HandleLinkRedirect() {
    const { enable } = this.state;
    if (enable) return '/carteira';
  }

  // HandleClickRedirect() {
  //   const { enable } = this.state;
  //   if (!enable) alert('Enail ou senha inválidos');
  // }

  handleSubmit(event) {
    const { history, saveEmail } = this.props;
    const { email } = this.state;
    event.preventDefault();
    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    return (
      <section className="login-container">
        <h1>Login</h1>
        <input
          data-testid="email-input"
          required
          type="email"
          name="email"
          placeholder=" Dígite seu email"
          onChange={ ({ target: { value } }) => this.setState({ email: value }) }
        />
        <input
          data-testid="password-input"
          required
          type="password"
          name="password"
          placeholder=" Senha"
          onChange={ ({ target: { value } }) => {
            this.setState({ password: value });
            return this.validateFields();
          } }
        />
        <Link
          className="btn"
          onClick={ this.handleSubmit }
          to={ () => this.HandleLinkRedirect() }
        >
          Entrar

        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(login(email)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
