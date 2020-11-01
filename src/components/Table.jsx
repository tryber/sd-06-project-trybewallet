import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenseState } = this.props;

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
          { expenseState.map((expense) => (
            <tr key={ expense.id }>
              <td name={ expense.description }>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>{ 
                  (Math.round((expense.exchangeRates[expense.currency].ask) * 100) / 100
                  ).toFixed(2)
                }
              </td>
              <td>{ 
                  (Math.round((expense.value * expense.exchangeRates[expense.currency].ask) * 100) / 100
                  ).toFixed(2)
                }
              </td>
              <td>Real</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseState: state.wallet.expenses,
});

Table.propTypes = {
  expenseState: PropTypes.arrayOf(PropTypes.any).isRequired, 
};

export default connect(mapStateToProps)(Table);
