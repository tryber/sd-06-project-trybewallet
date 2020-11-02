import React from 'react';
import { Header, ExpensesForm } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <section>
          <ExpensesForm />
        </section>
      </main>
    );
  }
}

export default Wallet;
