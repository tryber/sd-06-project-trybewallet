import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyThunk, fetchExpenseThunk } from '../actions';

class Form extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleExpenseButtonClick = this.handleExpenseButtonClick.bind(this);

    this.state = {
      expenses: {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
        exchangeRates: '',
      },
    };
  }

  componentDidMount() {
    const { currencysFetch } = this.props;
    currencysFetch();
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses, [name]: value },
    }));
  }

  handleExpenseButtonClick(event) {
    event.preventDefault();
    const { expenses } = this.state;
    const { addNewExpense } = this.props;
    addNewExpense(expenses);
    this.setState((prevState) => ({
      ...prevState,
      expenses: {
        ...prevState.expenses,
        id: prevState.expenses.id + 1,
        value: 0,
        description: '',
        currency: 'BRL',
        method: '',
        tag: '',
      },
    }));
  }

  render() {
    const { currencies } = this.props;
    const { expenses } = this.state;
    const { value, description, currency, method, tag } = expenses;
    const maxLengthCur = 3;
    return (
      <form>
        <label htmlFor="dispense">
          Dispresa
          <input
            name="value"
            value={ value }
            data-testid="value-input"
            type="number"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            name="description"
            value={ description }
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Cambio:
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies
              .filter((aCurrency) => aCurrency.length === maxLengthCur)
              .map((onlycur) => (
                <option
                  value={ onlycur }
                  key={ onlycur }
                  data-testid={ onlycur }
                >
                  { onlycur }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            value={ method }
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria para Dispesa
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleExpenseButtonClick }>
          Adicionar Despesa
        </button>
        Total: 0
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencysFetch: () => dispatch(fetchCurrencyThunk()),
  addNewExpense: (expenses) => dispatch(fetchExpenseThunk(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencysFetch: PropTypes.fuc,
  addNewExpense: PropTypes.func,
  currencies: PropTypes.object,
  expenses: PropTypes.object,
}.isRequired;
