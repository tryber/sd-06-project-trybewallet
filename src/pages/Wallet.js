import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
