import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return <div><p>{email}</p></div>;
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
  }
);

export default connect(mapStateToProps)(Wallet);
