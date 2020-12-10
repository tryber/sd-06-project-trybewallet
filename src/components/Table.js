import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableColumn, handleValue } from '../services/helper';
import { deleteExpenseID } from '../actions';
import '../css/bulma.css';

class Table extends React.Component {
  render() {
    const { expenses, dispatchDelete } = this.props;
    return (
      <section>
        <table className="table is-bordered is-striped is-narrow is-hoverable container">
          <tr className="tr">
            {tableColumn.map((item) => (
              <th className="th" key={ item }>{item}</th>)) }
          </tr>
          {expenses.map((expense) => {
            const abreviation = expense.currency;
            const currencyName = expense.exchangeRates[abreviation].name;
            const exchangeAsk = expense.exchangeRates[abreviation].ask;
            const valueConverted = expense.value * exchangeAsk;
            return (
              <tr className="tr" key={ expense.id }>
                <td className="td">{expense.description}</td>
                <td className="td">{expense.tag}</td>
                <td className="td">{expense.method}</td>
                <td className="td">{expense.value}</td>
                <td className="td">{currencyName}</td>
                <td className="td">{handleValue(exchangeAsk)}</td>
                <td className="td">{handleValue(valueConverted)}</td>
                <td className="td">Real</td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      className="button is-danger"
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
