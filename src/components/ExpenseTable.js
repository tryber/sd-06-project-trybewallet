import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { removeExpense, toogleEdit } from '../actions';
import AddExpense from './AddExpense';

import { response as mockResponse } from '../tests/mockData';

import '../css/ExpenseTable.css';

window.fetch = async () => ({ json: () => Promise.resolve(mockResponse) });

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseEditId: 0,
    };

    this.editHandler = this.editHandler.bind(this);
  }

  async editHandler(action, expense = {}) {
    const { dispatchEditMode } = this.props;

    if (action === 'edit') {
      await dispatchEditMode('on', expense);
    } else if (action === 'close') {
      await dispatchEditMode('off');
    }
  }

  calculateExpense(value, exchangeRate) {
    return (Math.round((value * exchangeRate) * 100) / 100).toFixed(2);
  }

  render() {
    const { deleteExpense, expenses, editMode } = this.props;
    const { expenseEditId } = this.state;

    return (
      <div className="expenses-table-wrapper">
        <table id="expenses-table" className="expenses-table">
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
              <th className="edit-btns">Editar/Excluir</th>
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
                    onClick={ () => (this.editHandler('edit', expense)) }
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
          (editMode === 'on')
            ? (
              <div className="edit-expense-wrapper">
                <AddExpense
                  editMode={ editMode }
                  editExpenseId={ expenseEditId }
                  expenseFormClassName="edit-expense-form"
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
  editMode: state.wallet.editMode,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(removeExpense(expense)),
  dispatchEditMode: (editMode, expense = {}) => dispatch(toogleEdit(editMode, expense)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  deleteExpense: PropTypes.func.isRequired,
  dispatchEditMode: PropTypes.func.isRequired,
  editMode: PropTypes.string.isRequired,
};

ExpenseTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
