import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendCurrencyThunk, addExpense, editExpense } from '../actions/index';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { sendCoins } = this.props;
    sendCoins();
  }

  expenseToAdd(total) {
    const { sendExpense, expenses, idEdit, sendEditedExpense } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = this.state;

    if (idEdit === undefined) {
      const id = expenses.length;
      const expense = {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      sendExpense(expense, total);
    } else {
      expenses[idEdit] = {
        id: idEdit,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      sendEditedExpense(expenses);
    }
  }

  async handleSubmit() {
    const { sendCoins, currencies, total } = this.props;
    const { currency, value } = this.state;
    await sendCoins();
    let ask = 0;
    Object.keys(currencies).forEach((item) => {
      if (currency === item) {
        ask = currencies[item].ask;
      }
    });
    this.setState({ exchangeRates: currencies });
    const newTotal = Number(total + (value * ask)).toFixed(2);
    this.expenseToAdd(+(newTotal));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencies, idEdit, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <div>
        <form action="">

          <label htmlFor="value-input">
            Valor:
            <input
              type="number"
              name="value"
              id="value-input"
              data-testid="value-input"
              value={ value }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          {expenses.value}
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="">Selecione</option>
              {Object.keys(currencies)
                .filter((coin) => coin !== 'USDT')
                .map((coin, index) => (
                  <option key={ index } data-testid={ coin }>{ coin }</option>
                ))}
            </select>
          </label>

          <label htmlFor="method-input">
            Metodo de pagamento:
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              value={ method }
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria:
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              value={ tag }
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="">Selecione</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description-input">
            Descricão da despesa:
            <input
              type="text"
              name="description"
              id="description-input"
              data-testid="description-input"
              value={ description }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>

          <button
            type="button"
            onClick={ () => this.handleSubmit() }
            disabled={ !(idEdit === undefined) }
          >
            Adicionar despesa
          </button>
          <button
            type="button"
            onClick={ () => this.handleSubmit() }
            disabled={ !(idEdit !== undefined) }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
  idEdit: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  sendCoins: () => dispatch(sendCurrencyThunk()),
  sendExpense: (expense, total) => dispatch(addExpense(expense, total)),
  sendEditedExpense: (expense) => dispatch(editExpense(expense)),
});

ExpenseForm.propTypes = {
  sendCoins: PropTypes.func.isRequired,
  sendExpense: PropTypes.func.isRequired,
  sendEditedExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.objectOf()).isRequired,
  expenses: PropTypes.objectOf(PropTypes.number).isRequired,
  total: PropTypes.number.isRequired,
  idEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
