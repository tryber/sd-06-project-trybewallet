import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.tagSelectMount = this.tagSelectMount.bind(this);
    this.paymentSelectMount = this.paymentSelectMount.bind(this);
    this.currencyMount = this.currencyMount.bind(this);
  }

  componentDidMount() {
    this.paymentSelectMount();
    this.tagSelectMount();
    this.currencyMount();
  }

  async currencyMount() {
    const currencyFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJson = await currencyFetch.json();
    const currencies = Object.keys(currencyJson).filter((cur) => cur !== 'USDT');
    currencies.forEach((cur) => {
      const option = document.createElement('option');
      option.innerText = cur;
      option.setAttribute('data-testid', cur);
      const select = document.querySelectorAll('select')[0];
      select.appendChild(option);
    });
  }

  paymentSelectMount() {
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    paymentMethod.forEach((payment) => {
      const option = document.createElement('option');
      option.innerText = payment;
      const select = document.querySelectorAll('select')[1];
      select.appendChild(option);
    });
  }

  tagSelectMount() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    tags.forEach((tag) => {
      const option = document.createElement('option');
      option.innerText = tag;
      const select = document.querySelectorAll('select')[2];
      select.appendChild(option);
    });
  }

  render() {
    return (
      <div>
        <form>
          <input data-testid="value-input" type="number" />
          <input data-testid="description-input" type="text" />
          <select data-testid="currency-input">
            {' '}
          </select>
          <select data-testid="method-input">
            {' '}
          </select>
          <select data-testid="tag-input">
            {' '}
          </select>
          <button type="button">Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}

export default Form;
