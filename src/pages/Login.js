import React from 'react';
import EmailInput from './Login_components/EmailInput';
import LoginButton from './Login_components/LoginButton';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <EmailInput />
          <LoginButton />
        </form>
      </div>
    );
  }
}

export default Login;
