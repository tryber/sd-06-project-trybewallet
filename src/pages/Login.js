import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {

    };
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { email, password } = this.state;
    const minLength = 5;
    const validEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const validPassword = (password.length > minLength);
    const loginIsValid = (validEmail && validPassword);
    return loginIsValid;
  }

  render() {
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
        />
        <br />
        <input
          type="password"
          data-testid="password-input"
        />
        <br />
        <button
          onClick={ this.isValid }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()
