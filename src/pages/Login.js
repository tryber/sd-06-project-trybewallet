import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { email, password } = this.props;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name=""
            value={ email }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
          />
          <button disabled="disabled" type="submit">ENTRAR</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
}.isRequired;

export default Login;
