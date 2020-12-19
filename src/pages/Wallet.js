import React from 'react';
import Header from '../components/Header';
import AddExpensesForm from '../components/AddExpensesForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddExpensesForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
