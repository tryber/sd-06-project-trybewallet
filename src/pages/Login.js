import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      senha: '',
      disabled: true,
      logedIn: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { email, senha } = this.state;
    const regexp = /^[a-zA-Z0-9.!#$%&_-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    this.setState({ [name]: value }, () => {
      let disabled = true;
      const five = 5;

      if (regexp.test(email) && senha.length >= five) disabled = false;

      this.setState({ disabled });
    });
  }

  handleClick() {
    const { emailDispatch } = this.props;
    const { email } = this.state;

    emailDispatch(email);

    this.setState({ logedIn: true });
  }

  render() {
    const { disabled, logedIn } = this.state;

    if (!logedIn) {
      return (
        <section>
          <label htmlFor="email-input">
            Email:
            <input
              required
              data-testid="email-input"
              placeholder="email@email.com"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              required
              data-testid="password-input"
              placeholder="senha"
              name="senha"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
      );
    }
    return (
      <Redirect to="/carteira" />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(addUserEmail(email)),
});

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
