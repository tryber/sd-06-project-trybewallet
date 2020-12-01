import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseDeleter, nowEditingExpense,
  updateStateWithEditedItem } from '../actions/currencyOptions';

const LinhaTabela = (props) => {
  const { deleteExpense, nowEditing, updateEditState, expense } = props;
  const { currency, description, method, value, tag, exchangeRates, id } = expense;
  const cambio = parseFloat(exchangeRates[currency].ask);
  const decimalValue = parseFloat(value);
  const totalGasto = cambio * decimalValue;
  return (
    <tr>
      <td>{ description }</td>
      <td>{ tag }</td>
      <td>{ method }</td>
      <td>{ `${decimalValue}` }</td>
      <td>{ exchangeRates[currency].name }</td>
      <td>{ `${cambio.toFixed(2)}` }</td>
      <td>{ `${totalGasto.toFixed(2)}` }</td>
      <td>Real</td>
      <td>
        <button
          type="button"
          data-testid="delete-btn"
          value={ id }
          onClick={ () => deleteExpense(expense) }
        >
          Deletar
        </button>
        <button
          type="button"
          data-testid="edit-btn"
          value={ id }
          onClick={ () => {
            updateEditState(expense);
            nowEditing();
          } }
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch(expenseDeleter(value)),
  nowEditing: () => dispatch(nowEditingExpense()),
  updateEditState: (value) => dispatch(updateStateWithEditedItem(value)),
});

LinhaTabela.propTypes = {
  deleteExpense: PropTypes.func,
  nowEditing: PropTypes.func,
  updateEditState: PropTypes.func,
  expense: PropTypes.instanceOf(Object),
}.isRequired;

export default connect(null, mapDispatchToProps)(LinhaTabela);
