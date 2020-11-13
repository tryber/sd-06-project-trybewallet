import React from 'react';
import PropTypes from 'prop-types';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

class ExpenseRow extends React.Component {
  render() {
    const { expenseToRender } = this.props;
    const { description, tag, method, value, currency, exchangeRates } = expenseToRender;
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
          <button type="button">
            <FaRegTrashAlt />
          </button>
          <button type="button">
            <FaEdit />
          </button>
        </td>
      </tr>
    );
  }
}

ExpenseRow.propTypes = {
  expenseToRender: PropTypes.shape({
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

export default ExpenseRow;
