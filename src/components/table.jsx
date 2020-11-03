import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expensesValue } = this.props;
    console.log(expensesValue);
    return (
      <table>
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
        <tbody>
          {expensesValue.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                { (Math
                    .round(parseFloat(expense.exchangeRates[expense.currency].ask) * 100) / 100) }
              </td>
              <td>
                { ((Math.round((expense.exchangeRates[expense.currency].ask * expense.value) * 100) / 100)) }
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesValue: state.wallet.expenses,
});

Table.propTypes = {
  expensesValue: PropTypes.arrayOf(Object).isRequired,
}

export default connect(mapStateToProps)(Table);
