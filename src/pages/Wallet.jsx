import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="header">
        <Header email="alguem@email.com" total={ 0 } />
        <ExpenseForm />
      </div>
    );
  }
}

export default Wallet;
