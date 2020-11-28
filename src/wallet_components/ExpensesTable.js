import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends React.Component {
  constructor() {
    super();
    this.createHeaders = this.createHeaders.bind(this);
    this.createEntries = this.createEntries.bind(this);
    this.createEditExcludeButtons = this.createEditExcludeButtons.bind(this);
  }

  createHeaders() {
    const dataHeaders = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <tr className="table-header">
        { dataHeaders.map((header, index) => (
          <th key={ `header-${index}` }>
            { header }
          </th>
        )) }
      </tr>
    );
  }

  createEditExcludeButtons() {

  }

  createEntries() {
    const { expenses } = this.props;

    return (
      expenses.map((expense) => {
        const {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates,
        } = expense;
        const currencyName = exchangeRates[`${currency}`].name;
        const usedRate = parseFloat(exchangeRates[`${currency}`].ask);
        const expenseValue = parseFloat(value);
        return (
          <tr key={ `expense-${id}` }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ currencyName }</td>
            <td>{ usedRate.toFixed(2) }</td>
            <td>{ parseFloat(usedRate * expenseValue).toFixed(2) }</td>
            <td>Real</td>
            <td>{ this.createEditExcludeButtons() }</td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <tbody>
          { this.createHeaders() }
          { this.createEntries() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, null)(ExpensesTable);
