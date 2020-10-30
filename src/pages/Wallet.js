import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <h2 data-testid="email-field"></h2>
        <p data-testid="total-field"></p>
        <p data-testid="header-currency-field"></p>
      </header>
    )
  }
}

export default Wallet;
