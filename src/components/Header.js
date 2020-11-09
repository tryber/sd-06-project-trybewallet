import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header_container">
          <div>
            <p data-testid="email-field">
              Email:
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              Despesa Total: 0
            </p>
          </div>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

export default Header;
