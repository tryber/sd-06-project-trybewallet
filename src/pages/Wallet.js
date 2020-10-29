import React from 'react';

class Wallet extends React.Component {
  handleSubmit(event) {
    return console.log(event.target.value);
  }

  // Formulário para adicionar despesa
  addExpenseForm() {
    const currencies = ['BRL', 'USD', 'CAD', 'EUR', 'GBP',
      'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const currenciesList = currencies.map((currency, index) => (
      <option
        key={ index }
        data-testid={ currency }
        value={ currency }
      >
        {currency}
      </option>));
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const paymentList = paymentMethods.map((method, index) => (
      <option
        key={ index }
        value={ method }
      >
        {method}
      </option>));
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const categoriesList = categories.map((category, index) => (
      <option
        key={ index }
        value={ category }
      >
        {category}
      </option>));

    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value-input">
          Valor da despesa:
          <input type="number" data-testid="value-input" id="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição da despesa:
          <input type="text" data-testid="description-input" id="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select data-testid="currency-input" id="currency-input">
            {currenciesList}
          </select>
        </label>
        <label htmlFor="method-input">
          Forma de Pagamento:
          <select data-testid="method-input" id="method-input">
            {paymentList}
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select data-testid="tag-input" id="tag-input">
            {categoriesList}
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }

  render() {
    return (
      <main>
        <header>
          <h1 data-testid="email-field">User email here</h1>
          <data data-testid="total-field">
            Total value here
            <span data-testid="header-currency-field">BRL</span>
          </data>
        </header>
        {this.addExpenseForm()}
      </main>
    );
  }
}

export default Wallet;
