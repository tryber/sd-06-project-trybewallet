import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    const { email, password } = this.state;
    return(
      <div>
        <form>
          <label>
            Email
            <input
              data-testid="email-input"
              name="email"
              type="email"
              value={email}
              placeholder="exemplo@gmail.com"
              required
              onChange={(e) => this.setState({email: e.target.value})}
              />
          </label>
          <label>
          <input
              data-testid="password-input"
              name="password"
              type="text"
              value={password}
              required
              onChange={(e) => this.setState({password: e.target.value})}
              />
          </label>
          <button>Entrar</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  formLogin: (data) => dispatch(login(data))
});

export default connect(
  null,
  mapDispatchToProps,
)
(Login);
