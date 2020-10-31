import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

import Header from '../components/Header';

class Login extends React.Component {
  render() {
    // const { login } = this.props;
    return (
      <Header titulo="planeje sua viagem!" />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
