import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableHeader extends Component {
  render() {
    const { expenses } = this.props;
    const roundValue = (value) => Math.round(value * 100) / 100;
    return (
      <table className="table table-dark">
        <thead>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>
                {expense.description}
              </td>
              <td>
                {expense.tag}
              </td>
              <td>
                {expense.method}
              </td>
              <td>
                {expense.value}
              </td>
              <td>
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td>
                {roundValue(expense.exchangeRates[expense.currency].ask)}
              </td>
              <td>
                {roundValue(expense.value * expense.exchangeRates[expense.currency].ask)}
              </td>
              <td>
                Real
              </td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableHeader.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableHeader);
