import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { nomeQueEuQuiser } = this.props;
    return <div>{nomeQueEuQuiser}</div>;
  }
}
mapStateToProps = (state) => ({
  nomeQueEuQuiser: state.wallet.helloWord,
});

export default connect(
  mapStateToProps,
)(Wallet);
