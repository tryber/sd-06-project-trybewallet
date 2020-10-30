import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="text"
            // value=""
            placeholder="email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
            data-testid="email-input"
            // required
          />
          <input
            type="password"
            // value=""
            data-testid="password-input"
            placeholder="senha"
            maxLength="6"
            onChange={ (e) => this.setState({ password: e.target.value }) }
          />
          <button
            type="submit"
            onClick={ () => this.props.login({ email, password }) }
          >
            <Link to="/carteira">Entrar</Link>
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e)) });

export default connect(null, mapDispatchToProps)(Login);
