import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class WalletTableBody extends Component {
  render() {
    const { expenses, deleteExpenseReq } = this.props;

    return (
      <tbody>
        {
          (expenses)
            ? expenses.map((el) => (
              <tr key={ el.currency }>
                <td>{ el.description }</td>
                <td>{ el.tag }</td>
                <td>{ el.method }</td>
                <td>{ el.value }</td>
                <td>{ el.exchangeRates[el.currency].name }</td>
                <td>{ parseFloat(el.exchangeRates[el.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    (el.exchangeRates[el.currency].ask * el.value).toFixed(2)
                  }
                </td>
                <td> Real </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpenseReq(el) }
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
  deleteExpenseReq: (data) => dispatch(deleteExpense(data)),
});

WalletTableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseReq: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(WalletTableBody);
