import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseTable, formatValue } from './fieldFormAndTable';
import { deleteExpense } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, dispatchDeleteExpense } = this.props;
    return (
      <section>
        <table className="table-css-wallet">
          <tr>
            {expenseTable.map((header) => (
              <th key={ header } className="table-css-expenses">{header}</th>))}
          </tr>

          {expenses.map((expense) => {
            const currencyAbreviation = expense.currency;
            const currency = expense.exchangeRates[currencyAbreviation].name;
            const exchangeRate = expense.exchangeRates[currencyAbreviation].ask;
            const convertedValue = expense.value * exchangeRate;

            return (
              <tr key={ expense.id }>
                <td className="table-expenses">{expense.description}</td>
                <td className="table-expenses">{expense.tag}</td>
                <td className="table-expenses">{expense.method}</td>
                <td className="table-expenses">{expense.value}</td>
                <td className="table-expenses">{currency}</td>
                <td className="table-expenses">{formatValue(exchangeRate)}</td>
                <td className="table-expenses">{formatValue(convertedValue)}</td>
                <td className="table-expenses">Real</td>
                <td>
                  <div>
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
