import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

// eslint-disable-next-line no-multi-assign
const mapStateToProps = (state) => ({
  nome: state.wallet.helloWorld,
});
export default connect(mapStateToProps)(Wallet);
