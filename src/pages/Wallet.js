import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <span data-testid="email-field">Aqui vai o email da pessoa</span>
          <input data-testid="total-field" />
          <input data-testid="header-currency-field" />
        </header>
        <br />
        <br />
        <br />
        <br />
        <section>
          <form>
            <fieldset>
              <input data-testid="value-input" />
              <input data-testid="description-input" />
            </fieldset>
          </form>
        </section>
      </div>
    );
  }
}

export default Wallet;
