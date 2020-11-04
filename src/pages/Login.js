import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { storeEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkBtnValidity = this.checkBtnValidity.bind(this);

    this.state = { email: '', password: '', isBtnDisabled: true, redirect: false };
  }

  handleClick() {
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({ redirect: true });
  }

  checkBtnValidity() {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = emailRegex.test(email);
    const passwordMinLength = 5;
    const testPassword = (password.length >= passwordMinLength);
    return (testEmail && testPassword);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    const btnValidity = this.checkBtnValidity();
    if (btnValidity) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  render() {
    const { isBtnDisabled, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            required
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            required
            name="password"
            id="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isBtnDisabled }
          onClick={ () => this.handleClick() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(storeEmail(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
