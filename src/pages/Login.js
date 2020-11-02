import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.goingToWallet = this.goingToWallet.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      const { password, email } = this.state;
      const passLength = 6;
      const emailValidation = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email);
      if (password.length >= passLength && emailValidation) {
        return this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  toWallet(event) {
    const { history, myEmail } = this.props;
    const { email } = this.state;
    event.preventDefault();
    myEmail(email);
    history.push('/carteira');
  }

  render() {
    const { disabled, email, password } = this.state;
    return (
      <div>
        <form onSubmit={ this.toWallet }>
          <label htmlFor="email" />
          E-mail:
          <input
            id="email"
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
            required
          />
          <label htmlFor="password" />
          Password
          <input
            id="password"
            type="password"
            value={ password }
            name="password"
            data-testid="password-input"
            minLength="6"
            onChange={ this.handleChange }
            required
          />
        </form>
        <button type="button" disabled={ disabled } onClick={ this.toWallet }>
        Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  myEmail: (value) => dispatch(newEmail(value)),
});

Login.propTypes = {
  myEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
