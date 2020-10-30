import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const verifyEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
      const passwordSize = 6;
      if (verifyEmail && password.length >= passwordSize) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    const { history, submitButton } = this.props;
    submitButton(email);
    history.push('carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <fieldset>
          <input
            data-testid="email-input"
            type="email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
            name="email"
          />
          <br />
          <br />
          <input
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ password }
            name="password"
          />
          <br />
          <br />
          <button type="submit" disabled={ isDisabled }>
            Entrar
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitButton: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  submitButton: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
