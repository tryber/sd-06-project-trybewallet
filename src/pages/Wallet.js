import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { loggedIn, email } = this.props;
    return (
      <div>
        {(!loggedIn) ? <Redirect to="/" /> : null }
        <Header />
        TrybeWallet
      </div>);
  }
}
const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  email: state.user.email,
});

// const mapDispatchToProps = (dispatch) => ({
//   addEmail: (email, loggedIn) => dispatch(addEmailToState(email, loggedIn)),
// });

export default connect(mapStateToProps)(Wallet);
