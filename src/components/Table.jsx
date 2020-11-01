import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Table extends Component {
  renderTable(expense) {
    const { id, description, method, tag, value, currency, exchangeRates } = expense;
    const currentCurrency = Object.values(exchangeRates)
      .find((item) => item.code === currency);

    const { name, ask } = currentCurrency;
    const convValue = (ask * value).toFixed(2);

    return (
      <tr id={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{name}</td>
        <td>{parseFloat(ask).toFixed(2)}</td>
        <td>{convValue}</td>
        <td>Real</td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length !== 0 && (
            expenses.map((expense) => this.renderTable(expense))
          ) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.objectOf().isRequired,
};
