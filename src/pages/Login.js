import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    // const { email, password } = this.props;
    return (
      <form>
        <div>
          <label>
            Email:
            <input
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email"
              required
              data-testid="email-input"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              required
              minlength="6"
              data-testid="password-input"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </label>
        </div>
        <Link to="/carteira">
          <input
            type="submit"
            // disabled={!buttonDisabled}
            value="Entrar"
            // onClick={() => addEmail(email)}
          />
        </Link>
      </form>
    );
  }
}

export default Login;
