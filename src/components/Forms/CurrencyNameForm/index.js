import React from 'react';

import './style.css';

class CurrencyNameForm extends React.Component {
  render() {
    const { currencyOnChange } = this.props;
    const moedas = ['BRL', 'USD', 'CAD'];
    return (
      <label htmlFor="currency-options">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-options"
          name="currency-options"
          className="currency-options"
          onChange={ ({ target }) => currencyOnChange(target.value) }
        >
          {moedas.map((moeda) => (
            <option
              key={ `${moeda}` }
              data-testid={ `${moeda}` }
              value={ `${moeda}` }
            >
              {moeda}
            </option>))}
        </select>
      </label>
    );
  }
}

export default CurrencyNameForm;
