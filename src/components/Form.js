import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseToRecord } from '../actions';
import Table from './Table';

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
      option.innerHTML = cur;
      option.setAttribute('data-testid', cur);
      const select = document.querySelectorAll('select')[0];
      select.appendChild(option);
    });
  }

  paymentSelectMount() {
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    paymentMethod.forEach((payment) => {
      const option = document.createElement('option');
      option.innerHTML = payment;
      const select = document.querySelectorAll('select')[1];
      select.appendChild(option);
    });
  }

  tagSelectMount() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    tags.forEach((tag) => {
      const option = document.createElement('option');
      option.innerHTML = tag;
      const select = document.querySelectorAll('select')[2];
      select.appendChild(option);
    });
  }

  async checkInfo(event) {
    event.preventDefault();
    event.persist();
    const obj = {};
    Object.values(event.target).forEach((input) => {
      if (input.name !== undefined && input.name !== '') {
        obj[input.name] = input.value;
      }
    });

    const currencyFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJson = await currencyFetch.json();
    const exchangesArray = Object.values(currencyJson)
      .filter((item) => item.codein !== 'BRLT');
    const exchangesObj = {};
    exchangesArray.forEach((cur) => {
      exchangesObj[cur.code] = cur;
    });
    obj.exchangeRates = exchangesObj;

    const { registerExpense, expenses } = this.props;
    obj.id = expenses.length;
    registerExpense(obj);
  }

  render() {
    return (
      <div>
        <form onSubmit={ (e) => this.checkInfo(e) }>
          <input data-testid="value-input" type="number" name="value" placeholder="0" />
          <input data-testid="description-input" type="text" name="description" />
          <select data-testid="currency-input" name="currency">
            {' '}
          </select>
          <select data-testid="method-input" name="method">
            {' '}
          </select>
          <select data-testid="tag-input" name="tag">
            {' '}
          </select>
          <button type="submit">Adicionar Despesa</button>
        </form>
        <Table />
      </div>
    );
  }
}

Form.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  registerExpense: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    registerExpense: (expense) => dispatch(addExpenseToRecord(expense)),
  };
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
