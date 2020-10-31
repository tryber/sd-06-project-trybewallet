import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableColumn, handleValue } from '../services/helper';
import { deleteExpenseID } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, dispatchDelete } = this.props;
    return (
      <section>
        <table>
          <tr>
            {tableColumn.map((item) => (
              <th key={ item }>{item}</th>)) }
          </tr>
          {expenses.map((expense) => {
            const abreviation = expense.currency;
            const currencyName = expense.exchangeRates[abreviation].name;
            const exchangeAsk = expense.exchangeRates[abreviation].ask;
            const valueConverted = expense.value * exchangeAsk;
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{currencyName}</td>
                <td>{handleValue(exchangeAsk)}</td>
                <td>{handleValue(valueConverted)}</td>
                <td>Real</td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => dispatchDelete(expense.id) }
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
    dispatchDelete: (id) => dispatch(deleteExpenseID(id)),
  });
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
