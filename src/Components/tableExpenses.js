import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableHeader, formatValue } from './walletHelpers';
import { deleteExpense } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, dispatchDeleteExpense } = this.props;
    return (
      <section className="expenses-container">
        <table>
          <tr>
            {tableHeader.map((header) => (
              <th key={ header } className="table-header">{header}</th>))}
          </tr>

          {expenses.map((expense) => {
            const currencyAbreviation = expense.currency;
            const currency = expense.exchangeRates[currencyAbreviation].name;
            console.log(currency);
            console.log(expense.exchangeRates[currencyAbreviation]);
            const exchangeRate = expense.exchangeRates[currencyAbreviation].ask;
            const convertedValue = expense.value * exchangeRate;

            return (
              <tr key={ expense.id }>
                <td className="table-cell">{expense.description}</td>
                <td className="table-cell">{expense.tag}</td>
                <td className="table-cell">{expense.method}</td>
                <td className="table-cell">{expense.value}</td>
                <td className="table-cell">{currency}</td>
                <td className="table-cell">{formatValue(exchangeRate)}</td>
                <td className="table-cell">{formatValue(convertedValue)}</td>
                <td className="table-cell">Real</td>
                <td>
                  <div className="edit-expense-container">
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => dispatchDeleteExpense(expense.id) }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return ({
    expenses: state.wallet.expenses,
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    dispatchDeleteExpense: (expenseId) => dispatch(deleteExpense(expenseId)),
  });
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchDeleteExpense: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
