import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      logged: true,
    };
    this.testVerifc = this.testVerifc.bind(this);
  }

  testVerifc() {
    const { username, password } = this.state;
    const verificated = 5;
    const re = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (re.test(String(username).toLowerCase()) && password.length >= verificated) {
      this.setState({
        logged: false,
      });
    } else {
      this.setState({
        logged: true,
      });
    }
  }

  render() {
    const { login, password, logged } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="email-input"
            placeholder="Login"
            value={ login }
            required="required"
          />
          <input
            type="password"
            data-testid="email-input"
            placeholder="Password"
            value={ password }
            required="required"
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ logged }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
