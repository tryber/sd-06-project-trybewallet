import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/index'
import PropTypes from 'prop-types';

class WalletTableBody extends Component {
  render() {
    const { expenses, sendExpenseId } = this.props;

    return (
      <tbody>
        {
          (expenses)
            ? expenses.map((exp) => (
              <tr key={ exp.currency }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ exp.value }</td>
                <td>{ exp.exchangeRates[exp.currency].name }</td>
                <td>{ parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    (exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)
                  }
                </td>
                <td> Real </td>
                <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => sendExpenseId(exp.id) }
                >
                  Deletar
                </button>
                </td>
              </tr>
            ))
            : ''
        }
      </tbody>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendExpenseId: (id) => dispatch(deleteExpense(id)),
});

WalletTableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(WalletTableBody);
