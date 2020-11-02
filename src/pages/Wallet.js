import React from 'react';
import ExpenseAddForm from '../components/ExpenseAddForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <ExpenseAddForm />
        </section>
      </div>
    );
  }
}

export default Wallet;
