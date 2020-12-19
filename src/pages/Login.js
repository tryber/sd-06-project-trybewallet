import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { password, email } = this.state;
      const emailValidation = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email);
      const passwordMinLength = 6;
      if (password.length >= passwordMinLength && emailValidation) {
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    });
  }

  redirect(event) {
    const { history, savingEmail } = this.props;
    event.preventDefault();
    const { email } = this.state;
    savingEmail(email);
    history.push('carteira');
  }

  render() {
    const { disable } = this.state;
    return (
      <div>
        <form onSubmit={ this.redirect } className="form-login">
          <h1 className="title">Wallet</h1>
          <br />
          <label htmlFor="email">
            <span className="bold">Email:</span>
            {' '}
            <input
              placeholder="Email"
              type="email"
              name="email"
              pattern="/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g"
              data-testid="email-input"
              id="email"
              onChange={ this.handleChange }
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            <span className="bold">Senha:</span>
            {' '}
            <input
              placeholder="Senha"
              type="password"
              name="password"
              id="password"
              minLength="6"
              data-testid="password-input"
              onChange={ this.handleChange }
              required
            />
          </label>
          <br />
          <button
            className="button-login"
            type="submit"
            disabled={ disable }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  savingEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  savingEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
