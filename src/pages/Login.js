import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
    };
  };

  handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      email: value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    const { userLogin } = this.props;
    userLogin(email);
  };


  render() {
    const { email } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            E-mail:
            <input data-testid="email-input" name="user-email" type="text" onChange={this.handleChange} value={email} />
          </label>
          <label>
            Password:
            <input data-testid="password-input" minLength="6" name="user-password" type="password" />
          </label>
          <button type="submit">
            Entrar
          </button>
        </form>
      </section>
    );
  };
};


const mapDispatchToProps = dispatch => ({
  userLogin: e => dispatch(loginAction(e))});

  export default connect(null, mapDispatchToProps)(Login);
