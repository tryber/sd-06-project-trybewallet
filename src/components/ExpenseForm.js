import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../actions/fetchCurrencies';
import fetchExpenses from '../actions/fetchExpenses';
import '../style/ExpenseForm.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      id: '',
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveExpense } = this.props;
    saveExpense(this.state);
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form className="form_wallet">
          <label htmlFor="value">
            Valor:
            <input
              className="value-input"
              data-testid="value-input"
              id="value"
              type="number"
              name="value"
              required
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              className="currency-input"
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((coin, index) => (
                <option
                  key={ index }
                  value={ coin }
                  data-testid={ coin }
                >
                  { coin }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              className="method-input"
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              className="tag-input"
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              className="description-input"
              data-testid="description-input"
              id="description"
              type="text"
              name="description"
              required
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="button_wallet"
            type="submit"
            onClick={ this.handleSubmit }
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
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(fetchExpenses(expense)),
});

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
