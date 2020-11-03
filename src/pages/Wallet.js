import React, { Component } from 'react';
import { WalletForm, WalletHeader } from '../components';

class Wallet extends Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <section>
          <WalletForm />
        </section>
      </div>
    );
  }
}

export default Wallet;
