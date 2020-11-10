import React from 'react';
import Header from '../components/Header';
import AddExpensesForm from '../components/AddExpensesForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddExpensesForm />
      </div>
    );
  }
}

export default Wallet;
