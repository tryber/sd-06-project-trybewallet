import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletDisplay extends React.Component {
  render() {
    const { expenses } = this.props;
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            {tableHeaders.map(
              (header, index) => (<th key={ index }>{header}</th>),
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((eachExpense) => {
            const { currency, value, exchangeRates } = eachExpense;
            const exchange = exchangeRates[currency].ask; // <3 <3
            const finalBRLValue = (exchange * value).toFixed(2);
            // solução encontrada no MDN :
            // [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed]
            const exchangeFinal = Number.parseFloat(exchange).toFixed(2);
            return (
              <tr key={ eachExpense.id }>
                <td>{eachExpense.description}</td>
                <td>{eachExpense.tag}</td>
                <td>{eachExpense.method}</td>
                <td>{eachExpense.value}</td>
                <td>{eachExpense.exchangeRates[currency].name}</td>
                <td>{exchangeFinal}</td>
                <td>Real</td>
                <td>{finalBRLValue}</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletDisplay.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletDisplay);
