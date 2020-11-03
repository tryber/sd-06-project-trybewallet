import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
    }
  }

  render() {
    const {email, password} = this.props
    return <div>
      <div>
        <label>
          Login
          <input 
            type="email"
            onChange={(e) => this.setState({ email:e.target.value })}
            placeholder="Email"
            data-testid="email-input"
          />
        </label>
        <label>
          <input
            type="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </label>
      </div>
      <button>Entrar</button>

    </div>;
  }
}

export default Login;
