import React from 'react';
// import { connect } from 'react-redux';

/*
Dropdown binding from API inspired by
https://www.carlrippon.com/react-drop-down-data-binding/
*/

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.getCurrenciesFromApi();
  }

  async getCurrenciesFromApi() {
    const requestResponse = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    );
    const formattedData = await requestResponse.json();
    const currencies = Object.keys(formattedData);
    const withoutUSDTCurrencies = currencies.filter((currency) => (
      currency !== 'USDT'
    ));
    this.setState({
      currencies: withoutUSDTCurrencies,
      selectedCurrency: '',
    });
  }

  render() {
    const { currencies, selectedCurrency } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            data-testid="currency-input"
            value={ selectedCurrency }
            onChange={ (event) => (
              this.setState({ selectedCurrency: event.target.value })
            ) }
          >
            { currencies.map((currency, index) => (
              <option key={ index } value={ currency } data-testid="USD">
                { currency }
              </option>
            )) }

          </select>
        </label>
      </form>
    );
  }
}

export default ExpensesForm;
