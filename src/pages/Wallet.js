import React from 'react';
import HeaderPage from '../components/Header';
import FormWalletPage from '../components/FormWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderPage />
        <FormWalletPage />
      </div>
    );
  }
}

export default Wallet;
