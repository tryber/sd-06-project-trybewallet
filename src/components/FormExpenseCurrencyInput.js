import React, { Component } from 'react';

class FormExpenseCurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const currency = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          value={ currency }
          onChange={ (event) => this.handleChange(event) }
          data-testid="currency-input"
          id="currency"
        >
          <option>USD</option>
          <option>CAD</option>
          <option>EUR</option>
          <option>GBP</option>
          <option>ARS</option>
          <option>BTC</option>
          <option>LTC</option>
          <option>JPY</option>
          <option>CHF</option>
          <option>AUD</option>
          <option>CNY</option>
          <option>ILS</option>
          <option>ETH</option>
          <option>XRP</option>
        </select>
      </label>
    );
  }
}

export default FormExpenseCurrencyInput;
