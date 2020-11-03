import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {

}
mapStateToProps = (state) => ({
  Login: state.wallet,
});

export default connect(
  mapStateToProps,
)(Wallet);
