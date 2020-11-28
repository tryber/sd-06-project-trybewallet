import React from 'react';
import WalletHeader from '../wallet_components/WalletHeader';
import ExpenseForm from '../wallet_components/ExpenseForm';
import ExpensesTable from '../wallet_components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <ExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
