import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../actions';
import fetchAPI from '../services';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const expensesCategories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fetchInfoCurrencies = this.fetchInfoCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      description: '',
      expenseCategory: 'Alimentação',
      paymentMethod: 'Dinheiro',
      value: 0,
      currency: 'USD',
      exchange: 0,
      convertedValue: 0,
      conversionCurrency: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  fetchInfoCurrencies() {
    return async () => {
      const apiResponse = await fetchAPI();
      console.log(apiResponse);
    };
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { sendExpense } = this.props;
    this.fetchInfoCurrencies();
    sendExpense(this.state);
  }

  render() {
    const { value, description, currency, paymentMethod, expenseCategory } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies
                .map((coin) => (
                  <option data-testid={ coin } value={ coin } key={ coin }>
                    { coin }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="paymentMethod"
              name="paymentMethod"
              value={ paymentMethod }
              onChange={ this.handleChange }
            >
              {paymentMethods
                .map((method) => (
                  <option value={ method } key={ method }>
                    { method }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="expenseCategory">
            Categoria:
            <select
              data-testid="tag-input"
              id="expenseCategory"
              name="expenseCategory"
              value={ expenseCategory }
              onChange={ this.handleChange }
            >
              {expensesCategories
                .map((category) => (
                  <option value={ category } key={ category }>
                    { category }
                  </option>
                ))}
            </select>
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (expense) => dispatch(addExpense(expense)),
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
});

Form.propTypes = {
  sendExpense: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.object).isRequired,
  dispatchFetchCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
