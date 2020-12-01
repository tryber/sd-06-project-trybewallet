import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editingExpense } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  }

  handleEditing(idExpense) {
    const { edt } = this.props;
    edt(idExpense);
  }

  handleDelete(expenseId) {
    const { dlt } = this.props;
    dlt(expenseId);
  }

  renderItems(expense) {
    const currencyUsed = Object.values(expense.exchangeRates)
      .find((coin) => coin.code === expense.currency);

    const decimalsAllowed = 2;
    const convertedValue = parseFloat(currencyUsed.ask * expense.value)
      .toFixed(decimalsAllowed);

    return (
      <tr id={ expense.id }>
        <td>
          {expense.description}
        </td>
        <td>
          {expense.tag}
        </td>
        <td>
          {expense.method}
        </td>
        <td>
          {expense.value}
        </td>
        <td>
          {currencyUsed.name}
        </td>
        <td>
          {parseFloat(currencyUsed.ask).toFixed(decimalsAllowed)}
        </td>
        <td>
          {convertedValue}
        </td>
        <td>Real</td>
        <div>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.handleEditing(expense.id) }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleDelete(expense.id) }
          >
            Excluir

          </button>
        </div>
      </tr>

    );
  }

  render() {
    const { expenses } = this.props;
    return (

      <div>
        <table>
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
          {expenses.length !== 0
          && expenses.map((expense) => this.renderItems(expense))}
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { expenses: state.wallet.expenses };
}
const mapDispatchToProps = (dispatch) => ({
  dlt: (expense) => dispatch(deleteExpenses(expense)),
  edt: (expenseEditingId) => dispatch(editingExpense(expenseEditingId)),
});

Table.propTypes = {
  map: PropTypes.func.isRequired,
  expenses: PropTypes.string.isRequired,
  dlt: PropTypes.func.isRequired,
  edt: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
