import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

class Wallet extends React.Component {
  render() {
    return (
      <div className="header">
        <Header />
        <ExpenseForm />
        <ExpenseList />
      </div>
    );
  }
}

export default Wallet;
