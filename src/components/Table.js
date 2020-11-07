import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor() {
    super();
    this.originalValue = this.originalValue.bind(this);
    this.exchangeRate = this.exchangeRate.bind(this);
  }

  originalValue(expense) {
    return (Math.round((Number(expense.value)
        * (Object.values(expense.exchangeRates)
          .find((currency) => currency.code === expense.currency)
          .ask)) * 100) / 100).toFixed(2);
  }

  exchangeRate(expense) {
    return (Math.round((Object.values(expense.exchangeRates)
      .find((currency) => currency.code === expense.currency)
      .ask) * 100) / 100).toFixed(2);
  }

  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    return (
      <div>
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
          { expenses.map((expense, key) => (
            <tbody
              key={ key }
            >
              <tr>
                <td>
                  { expense.description }
                </td>
                <td>
                  { expense.tag }
                </td>
                <td>
                  { expense.method }
                </td>
                <td>
                  { expense.value }
                </td>
                <td>
                  { expense.exchangeRates[expense.currency]
                    .name }
                </td>
                <td>
                  { this.exchangeRate(expense) }
                </td>
                <td>
                  { this.originalValue(expense) }
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button
                    type="button"
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Table);
