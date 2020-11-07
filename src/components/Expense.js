import React from 'react';
import PropTypes from 'prop-types';

class Expense extends React.Component {
  render() {
    const { expense } = this.props;
    const currencyName = expense.exchangeRates[expense.currency].name;
    const currencyRate = parseFloat(expense.exchangeRates[expense.currency].ask);
    return (
      <tr>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ currencyName }</td>
        <td>{ currencyRate.toFixed(2) }</td>
        <td>
          { (expense.value * currencyRate).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button type="button" data-testid="edit-btn">Editar</button>
          <button type="button" data-testid="delete-btn">Excluir</button>
        </td>
      </tr>
    );
  }
}

Expense.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    exchangeRates: PropTypes.shape(),
    currency: PropTypes.string,
  }).isRequired,
};

export default Expense;
