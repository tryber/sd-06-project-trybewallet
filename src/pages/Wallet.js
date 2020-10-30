import React from 'react';
import WalletHeader from '../wallet_components/WalletHeader';
import ExpenseForm from '../wallet_components/ExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <ExpenseForm />
      </div>
    );
  }
}

export default Wallet;
