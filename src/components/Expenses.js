import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencyThunk, addThunk } from '../actions';
import './Expenses.css';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };

    this.handleInput = this.handleInput.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  componentDidMount() {
    const { setCurrency } = this.props;
    setCurrency();
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async saveExpense(event) {
    event.preventDefault();
    const { sendExpense } = this.props;
    sendExpense(this.state);
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const { currenciesApi } = this.props;
    return (
      <div className="expenses-container">
        <form onSubmit={ this.saveExpense }>
          <label htmlFor="expense-value">
            Valor:
            <input
              className="expense-input"
              name="value"
              id="expense-value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="expense-description">
            Descrição despesa:
            <input
              className="expense-input"
              name="description"
              id="expense-description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              className="currency-select"
              name="currency"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleInput }
            >
              {currenciesApi.map((eachCurrency) => (
                <option
                  key={ eachCurrency }
                  value={ eachCurrency }
                  data-testid={ eachCurrency }
                >
                  { eachCurrency }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento:
            <select
              className="method-select"
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              className="tag-select"
              name="tag"
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            className="btn-expense"
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrency: () => dispatch(currencyThunk()),
  sendExpense: (expense) => dispatch(addThunk(expense)),
});

const mapStateToProps = (state) => ({
  currenciesApi: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Expenses.propTypes = {
  setCurrency: propTypes.func.isRequired,
  sendExpense: propTypes.func.isRequired,
  currenciesApi: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
