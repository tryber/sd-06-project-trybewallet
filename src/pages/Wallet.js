import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <p data-testid="email-field">Email:</p>
          <p data-testid="total-field">Despesas:</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

export default Wallet;
