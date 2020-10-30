import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="email-field">Email: </p>
        <p data-testid="total-field">Despesa total:</p>
      </div>
    );
  }
}

export default Header;
