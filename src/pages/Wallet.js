import React from 'react';
import ExpenseAddForm from '../components/ExpenseAddForm';
import Header from '../components/Header';
import TableOfExpenses from '../components/TableOfExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <ExpenseAddForm />
          <TableOfExpenses />
        </section>
      </div>
    );
  }
}

export default Wallet;
