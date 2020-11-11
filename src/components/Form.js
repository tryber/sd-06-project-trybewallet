import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addExpenseThunk, fetchCurrencies, editExpense } from '../actions';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const expensesCategories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getExpenseForEdition = this.getExpenseForEdition.bind(this);
    this.state = {
      id: '',
      value: 0,
      description: '',
      currency: 'USD',
      method: paymentMethods[0],
      tag: expensesCategories[0],
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { editingExpense } = this.props;
    if (editingExpense !== '' && editingExpense !== prevProps.editingExpense) {
      this.getExpenseForEdition();
    }
  }

  getExpenseForEdition() {
    const { editingExpense, expenses } = this.props;
    const expenseForEdition = expenses.find((expense) => expense.id === editingExpense);
    this.setState({
      ...expenseForEdition,
    });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { editingExpense, sendExpense, sendExpenseEdited } = this.props;
    if (editingExpense !== '') {
      sendExpenseEdited(this.state);
    } else {
      sendExpense(this.state);
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editingExpense } = this.props;
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
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              {paymentMethods
                .map((payMethod) => (
                  <option value={ payMethod } key={ payMethod }>
                    { payMethod }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
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
          {editingExpense !== ''
            ? <button type="submit">Editar despesa</button>
            : <button type="submit"> Adicionar despesa</button>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editingExpense: state.wallet.expenseOnEditingId,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (expense) => dispatch(addExpenseThunk(expense)),
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  sendExpenseEdited: (expense) => dispatch(editExpense(expense)),
});

Form.propTypes = {
  sendExpense: propTypes.func.isRequired,
  sendExpenseEdited: propTypes.func.isRequired,
  editingExpense: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  dispatchFetchCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
