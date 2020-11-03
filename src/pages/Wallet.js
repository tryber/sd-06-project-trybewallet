import React, { Component } from 'react';
import { WalletForm, WalletHeader, WalletTable } from '../components';

class Wallet extends Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <section>
          <WalletForm />
          <WalletTable />
        </section>
      </div>
    );
  }
}

export default Wallet;
