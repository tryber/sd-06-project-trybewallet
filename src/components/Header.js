import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <span data-testid="email-field">
          Email:
          {}
        </span>
        <span data-testid="total-field">
          Despesa total:
          {}
        </span>
        <span data-testid="header-currency-field">
          {}
        </span>
      </header>
    );
  }
}

export default Header;
