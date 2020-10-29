import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailUpdate, passwordUpdate } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
  };

  validateEmail(email) {
    const validateEmailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

    return validateEmailRegex.test(email)
  }

  validatePassword(password) {
    const minimumPasswordLength = 6;

    return (password.length >= minimumPasswordLength ? true : false);
  }

  handleDisableButton = () => {
    const { email, password } = this.props.user;
    const { validateEmail, validatePassword } = this;

    return (validateEmail(email) && validatePassword(password) ? false : true);
  };

  render() {
    const { emailUpdateAction, passwordUpdateAction } = this.props;
    const { email, password } = this.props.user;
    const { handleDisableButton } = this;

    return (<div>
      <label htmlFor="email-input">Insira seu e-mail:</label>
      <input
        type="text"
        placeholder="email@domain.com"
        data-testid="email-input"
        onChange={ ({ target: { value } }) => emailUpdateAction(value) }
        value={ email }
      />
      <label htmlFor="password-input">Insira seu password:</label>
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
        onChange={ ({ target: { value } }) => passwordUpdateAction(value) }
        value={ password }
      />
      <Link to="/carteira"><button disabled={ handleDisableButton() }>Entrar</button></Link>
    </div>);
  };
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  emailUpdateAction: (email) => dispatch(emailUpdate(email)),
  passwordUpdateAction: (password) => dispatch(passwordUpdate(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
