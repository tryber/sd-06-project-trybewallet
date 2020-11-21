import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense, totalField } from '../actions';

class TableBody extends Component {
  render() {
    const { expenses, dispatchDeleteExpense, dispatchEditExpense, update } = this.props;

    return (
      <tbody>
        {
          expenses ? expenses.map((expense, index) => (
            <tr key={ expense.currency }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {
                  (expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2)
                }
              </td>
              <td> Real </td>
              <td> --- </td>
              <button
                data-testid="delete-btn"
                onClick={ () => {
                  dispatchDeleteExpense(expense);
                  update();
                } }
                type="button"
              >
                excluir
              </button>
              <button
                data-testid="edit-btn"
                onClick={ () => {
                  expense.id = index;
                  dispatchEditExpense(expense);
                  update();
                } }
                type="button"
              >
                Editar
              </button>
            </tr>
          ))
            : ''
        }
      </tbody>
    );
  }
}
TableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchDeleteExpense: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (id) => dispatch(deleteExpense(id)),
  dispatchEditExpense: (expense) => dispatch(editExpense(expense)),
  update: () => dispatch(totalField()),
});

export default connect(null, mapDispatchToProps)(TableBody);
