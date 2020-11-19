import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, totalField } from '../actions';

class TableBody extends Component {
  render() {
    const { expenses, deleta, update } = this.props;

    return (
      <tbody>
        {
          expenses ? expenses.map((item) => (
            <tr key={ item.currency }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>
                {
                  (item.exchangeRates[item.currency].ask * item.value).toFixed(2)
                }
              </td>
              <td> Real </td>
              <td> --- </td>
              <button
                data-testid="delete-btn"
                onClick={ () => {
                  deleta(item);
                  update();
                } }
                type="button"
              >
                excluir
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
  deleta: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleta: (id) => dispatch(deleteExpense(id)),
  update: () => dispatch(totalField()),
});

export default connect(null, mapDispatchToProps)(TableBody);
