import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { nomeDoExemploIcaro } = this.props;
    return <div>{ nomeDoExemploIcaro }</div>;
  }
}

const mapStateToProps = (state) => ({
  nomeDoExemploIcaro: state.wallet.helloWorld,
});

export default connect(
  mapStateToProps,
)(Wallet);
