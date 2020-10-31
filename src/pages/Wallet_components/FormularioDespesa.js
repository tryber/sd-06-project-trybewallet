import React from 'react';
import AddButton from './AddButton';

class FormularioDespesa extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   id: 0,
    //   value: 0,
    //   description: '',
    //   currency: 'BRL',
    //   method: '',
    //   tag: '',
    //   exchangeRates: {},
    // };

    // this.addExpense = this.addExpense.bind(this);
  }

  currencyOptions() {
    const currencyArray = ['USD', 'CAD', 'EUR', 'GBP',
      'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY',
      'ILS', 'ETH', 'XRP'];

    return currencyArray
      .map((currency) => (
        <option
          key={ currency }
          data-testid={ currency }
        >
          {`${currency}`}
        </option>
      ));
  }

  payMethod() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    return methods
      .map((method) => (
        <option
          key={ method }
          data-testid={ method }
        >
          {`${method}`}
        </option>
      ));
  }

  tagOption() {
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return tagOptions
      .map((tag) => (
        <option
          key={ tag }
          data-testid={ tag }
        >
          {`${tag}`}
        </option>
      ));
  }

  // addExpense() {
  //   // const { id, expenseValue, description, currency, payMethod, categoryTag } = this.state;

  //   this.setState = {
  //     // pegar os valores dos inputs
  //   };
  // }

  render() {
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select data-testid="currency-input">
            {this.currencyOptions()}
          </select>
        </label>

        <label htmlFor="method-input">
          Forma de pagamento:
          <select data-testid="method-input">
            {this.payMethod()}
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select data-testid="tag-input">
            {this.tagOption()}
          </select>
        </label>

        <AddButton onClick={ this.addExpense } />

      </div>
    );
  }
}

export default FormularioDespesa;
