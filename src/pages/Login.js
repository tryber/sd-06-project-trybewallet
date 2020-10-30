import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
    this.validEmail = this.validEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validEmail() {
    const MIN_LENGTH = 6;
    const { email, password } = this.state;
    this.setState({
      isValid: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
      && password.length >= MIN_LENGTH,
    });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validEmail();
    });
  }

  handleSubmit(event) {
    const { history, saveEmail } = this.props;
    const { email } = this.state;
    event.preventDefault();
    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isValid } = this.state;
    return (
      <section className="landing-page">
        <form>
          <img
            src="/trybeWallet.png"
            alt="Trybe Logo"
          />
          <label htmlFor="email">
            <input
              onChange={ this.handleChange }
              data-testid="email-input"
              type="email"
              name="email"
              id="email"
              value={ email }
            />
          </label>
          <label htmlFor="password">
            <input
              onChange={ this.handleChange }
              data-testid="password-input"
              type="text"
              name="password"
              id="password"
              value={ password }
            />
          </label>
          <Link to="/carteira">
            <button
              disabled={ !isValid }
              type="submit"
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </Link>
        </form>
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
