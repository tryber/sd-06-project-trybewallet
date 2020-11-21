import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { storeExpenses } = this.props;
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
          { storeExpenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                {
                  parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                }
              </td>
              <td>
                {
                  (parseFloat(expense.exchangeRates[expense.currency].ask)
                  * expense.value).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar despesa
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                >
                  Deleta despesa
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  storeExpenses: state.wallet.expenses,
});

Table.propTypes = {
  storeExpenses: PropTypes.arrayOf(PropTypes.any),
};

Table.defaultProps = {
  storeExpenses: {},
};

export default connect(mapStateToProps, null)(Table);
