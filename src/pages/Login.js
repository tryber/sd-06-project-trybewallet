import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.state = {
      disable: true,
      email: '',
      password: '',
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    this.validateInputs(prevState);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { userEmail } = this.props;
    const { email } = this.state;
    userEmail(email);
  }

  validateInputs(prevState) {
    const { email, password } = this.state;
    if (prevState.password !== password) {
      const regex = (/^[a-z0-9]+@[a-z0-9]+\.+[a-z]+(\.[a-z]+)?$/i);
      const isValidEmail = regex.test(email);
      const passwordLength = 6;
      if (isValidEmail
        && password.length >= passwordLength) {
        this.setState({ disable: false });
      }
    }
  }

  render() {
    const { disable, email, password } = this.state;
    return (
      <div>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="E-mail"
            required
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            data-testid="password-input"
            width-min="6"
            placeholder="Password"
            required
            onChange={ this.handleChange }
            value={ password }
          />
        </label>
        <Link
          to="/carteira"
          onClick={ this.handleClick }
        >
          <button
            type="submit"
            disabled={ disable }
          >
            Entrar
          </button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(loginAction(email)),
});
Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
