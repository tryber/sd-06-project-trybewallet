import React from 'react';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div data-testid="email-field">Email do usuario</div>
          <div data-testid="total-field">
            Gastos totais:
            { 0 }
          </div>
          <div data-testid="header-currency-field">Cambio: BRL</div>
        </header>
        <Form />
      </div>
    );
  }
}

export default Wallet;
