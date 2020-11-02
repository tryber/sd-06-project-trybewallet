import React from 'react';
import { connect } from 'react-redux';

import './style.css';

class CurrencyNameForm extends React.Component {
  render() {
    const { currencyOnChange, allCurrencies } = this.props;
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
          {Object.keys(allCurrencies).filter((currency) => currency !== 'USDT').map((currency) => (
            <option
              key={ `${currency}` }
              data-testid={ `${currency}` }
              value={ `${currency}` }
            >
              {currency}
            </option>))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  allCurrencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(CurrencyNameForm);
