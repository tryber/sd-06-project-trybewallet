/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form className="login">
          <label>
            Login:
            {' '}
            <br />
            <input
              name="email"
              data-testid="email-input"
              type="email"
              onChange={ (e) => this.state({ user: e.target.value }) }
            />
          </label>
          <label>
            Senha:
            {' '}
            <br />
            <input
              name="password"
              data-testid="password-input"
              type="email"
              onChange={ (e) => this.state({ user: e.target.value }) }
            />
          </label>
          <label>
            <br />
            <button
              name="password"
              data-testid="button-input"
              type="button"
              onClick={ this.props.login }
            >
              ENTRAR
            </button>
          </label>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  login: state,
});

// const mapDispatchToProps =(dispatch) => ({

// })

export default connect(mapStateToProps)(Login);
