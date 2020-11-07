import React from 'react';
import { Header, ExpensesForm, ExpensesTable } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <section>
          <ExpensesForm />
        </section>
        <section>
          <ExpensesTable />
        </section>
      </main>
    );
  }
}

export default Wallet;
