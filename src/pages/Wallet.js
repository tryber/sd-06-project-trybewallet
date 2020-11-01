import React from 'react';
import FormWallet from '../components/FormWallet';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormWallet />
        <TableExpenses />
      </div>
    );
  }
}

export default Wallet;
