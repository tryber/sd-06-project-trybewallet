import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Login"
            value=""
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Password"
            value=""
          />
          <button
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
