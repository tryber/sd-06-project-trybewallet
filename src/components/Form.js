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
    this.handleChange = this.handleChange.bind(this);
    this.submitInfo = this.submitInfo.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      total: 0,
    };
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
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    method.forEach((payment) => {
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

  async submitInfo(e) {
    e.preventDefault();
    const obj = { ...this.state };
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

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, description, method,
      tag, currency } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="value-input"
            type="number"
            name="value"
            step="0.01"
            min="0"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {' '}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {' '}
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {' '}
          </select>
          <button type="submit" onClick={ this.submitInfo }>Adicionar Despesa</button>
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
