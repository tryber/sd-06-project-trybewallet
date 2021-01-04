import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Expense extends React.Component {
  render() {
    const { expense, deleteExpenseAction } = this.props;
    const currencyName = expense.exchangeRates[expense.currency].name;
    const currencyRate = parseFloat(expense.exchangeRates[expense.currency].ask);
    const convertedBRLExpense = (expense.value * currencyRate).toFixed(2);
    return (
      <tr>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ currencyName }</td>
        <td>{ currencyRate.toFixed(2) }</td>
        <td>{ convertedBRLExpense }</td>
        <td>Real</td>
        <td>
          <button type="button" data-testid="edit-btn">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteExpenseAction(expense.id, convertedBRLExpense) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

Expense.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
    exchangeRates: PropTypes.shape(),
    currency: PropTypes.string,
  }).isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    deleteExpenseAction: (expenseId, convertedBRLExpense) => dispatch(
      deleteExpense(expenseId, convertedBRLExpense),
    ),
  };
}

export default connect(null, mapDispatchToProps)(Expense);
