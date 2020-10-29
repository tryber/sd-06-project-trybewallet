import React from 'react';

class Header extends React.Component {
  render() {
    return(
      <header className="header">
        <span data-testid="email-field">
          Exibir Email
        </span>
        <span data-testid="total-field">
          Despesa Total: 0,00
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

export default Header;
