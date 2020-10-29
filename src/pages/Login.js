import React from 'react';
import logo from './logotrybe.png';

class Login extends React.Component {
  render() {
    return (
    <div className="login">
      <img alt="trybe-logo" src={logo} width="200px" />
      <br />
      <input type="text" />
    </div>
    );
  }
}

export default Login;
