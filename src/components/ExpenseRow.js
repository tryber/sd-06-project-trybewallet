import React from 'react';
import PropTypes from 'prop-types';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class ExpenseRow extends React.Component {
  render() {
    const { expenseToRender, deleteSelected } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expenseToRender;
    const { ask: rate, name } = exchangeRates[currency];

    const twoDecimalValue = ((Math.round(value * 100)) / 100);
    const twoDecimalRate = ((Math.round(rate * 100)) / 100).toFixed(2);
    const twoDecimalConverted = ((Math.round((value * rate) * 100)) / 100).toFixed(2);

    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{twoDecimalValue}</td>
        <td>{name}</td>
        <td>{twoDecimalRate}</td>
        <td>{twoDecimalConverted}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            name={ id }
            onClick={ () => deleteSelected(id) }
          >
            <FaRegTrashAlt />
          </button>
          <button type="button" data-testid="edit-btn">
            <FaEdit />
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteSelected: (e) => dispatch(deleteExpense(e)),
});

export default connect(null, mapDispatchToProps)(ExpenseRow);

ExpenseRow.propTypes = {
  deleteSelected: PropTypes.func.isRequired,
  expenseToRender: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.number,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
};
