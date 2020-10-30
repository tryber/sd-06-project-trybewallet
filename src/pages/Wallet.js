import React from 'react';
import Header from './Wallet_components/Header';
import FormularioDespesa from './Wallet_components/FormularioDespesa';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div>TrybeWallet</div>
        <Header />
        <FormularioDespesa />
      </div>
    );
  }
}

export default Wallet;
