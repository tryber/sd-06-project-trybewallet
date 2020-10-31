import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

class Login extends React.Component {
  render() {
    const { login } = this.props;
    return <div>Login</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
