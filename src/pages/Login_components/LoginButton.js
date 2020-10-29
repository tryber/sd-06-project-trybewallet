import React from 'react';

class LoginButton extends React.Component {
  render() {
    return (
      <button
        type="submit"
        disabled={
          emailError || passwordError || !email || !password
        }
      >
        Entrar
      </button>
    );
  }
}

export default LoginButton;
