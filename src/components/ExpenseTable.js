import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import fetchApi from '../services/fetchApi';
import { storeExpense, removeExpense, toogleEdit } from '../actions';
import { AddExpense } from '.';

import { response as mockResponse } from '../tests/mockData';

import '../css/ExpenseTable.css';

window.fetch = async () => ({ json: () => Promise.resolve(mockResponse) });

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }

  async editHandler(action, { id, description } = {}) {
    const { dispatchEditMode } = this.props;
    dispatchEditMode(true);

    if (action === 'edit') {
      await this.setState({
        editMode: true,
        expenseEditId: id,
        expenseEditDescription: description });
    } else if (action === 'close') {
      await dispatchEditMode(false);
      this.setState({ editMode: false });
    }
  }

  async handleAddExpense(event) {
    event.preventDefault();
    const { expenses, dispatchExpense } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const validForm = (value > 0 && description !== '');
    if (validForm) {
      const currentCurrencies = await fetchApi();
      const currencies = Object.keys(currentCurrencies);
      const exchangeRates = currencies.reduce((obj, current) => {
        const currentObj = { ...obj,
          [current]: { ...currentCurrencies[current] },
        };

        return currentObj;
      }, {});

      const newExpense = {
        id: expenses.length,
        currency,
        value,
        method,
        tag,
        description,
        exchangeRates,
      };

      dispatchExpense(newExpense);

      document.getElementById('expense-form').reset();
      this.setState({
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        value: 0,
        description: '',
      });
    } else {
      console.log('form não preenchido.');
    }
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  calculateExpense(value, exchangeRate) {
    return (Math.round((value * exchangeRate) * 100) / 100).toFixed(2);
  }

  render() {
    const { deleteExpense, expenses } = this.props;
    const { editMode, expenseEditId, expenseEditDescription } = this.state;
    const { editHandler } = this;
    return (
      <div>
        <table id="expenses-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td name={ expense.description }>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td
                  name={ (
                    Math.round((expense.exchangeRates[expense.currency].ask) * 100) / 100)
                    .toFixed(2) }
                >
                  { (
                    Math.round((expense.exchangeRates[expense.currency].ask) * 100) / 100)
                    .toFixed(2)}
                </td>
                <td
                  name={ this.calculateExpense(
                    expense.value,
                    expense.exchangeRates[expense.currency].ask,
                  ) }
                >
                  { this.calculateExpense(
                    expense.value,
                    expense.exchangeRates[expense.currency].ask,
                  ) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={
                      () => (editHandler(
                        'edit',
                        { id: expense.id, description: expense.description },
                      ))
                    }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => deleteExpense(expense.description) }
                    data-testid="delete-btn"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        { (
          (editMode)
            ? (
              <div className="edit-expense">
                <AddExpense
                  editMode={ editMode }
                  editExpense={ { expenseEditId, expenseEditDescription } }
                  editHandler={ () => editHandler('edit') }
                />
              </div>
            )
            : <div />
        ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(storeExpense(expense)),
  deleteExpense: (expense) => dispatch(removeExpense(expense)),
  dispatchEditMode: (editMode) => dispatch(toogleEdit(editMode)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  dispatchExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  dispatchEditMode: PropTypes.func.isRequired,
};

ExpenseTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
