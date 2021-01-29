import React, { Component } from 'react';
import { WalletForm, WalletTable } from '../components';

class Wallet extends Component {
  render() {
    return (
      <div>
          <WalletForm />
          <WalletTable />        
      </div>
    );
  }
}

export default Wallet;
