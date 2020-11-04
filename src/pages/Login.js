import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      notValidated: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.enterClickEvent = this.enterClickEvent.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState(
      {
        [id]: value,
      },
      () => this.validateLogin(),
    );
  }

  validateLogin() {
    const { email, password } = this.state;
    // Alberto postou no slack esse Regex =)
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
    const six = 6;
    if (email.match(emailFormat) && password.length >= six) {
      this.setState({ notValidated: false });
    } else {
      this.setState({ notValidated: true });
    }
  }

  enterClickEvent(event) {
    const { history, save } = this.props;
    const { email } = this.state;
    event.preventDefault();
    save(email);
    history.push('/carteira');
  }

  render() {
    const { notValidated, email, password } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="Digite seu e-mail"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            data-testid="password-input"
            type="text"
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>
        <Link to="/carteira">
          <button
            disabled={ notValidated }
            type="submit"
            onClick={ this.enterClickEvent }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  save: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  save: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
