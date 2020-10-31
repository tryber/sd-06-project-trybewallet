import React from 'react';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  render() {

    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir']
    const { description, tag, method, value, currency, askRate } = this.props;

    return(
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {description.map((value) => <td key={value}>{value}</td>)}
            {tag.map((value) => <td key={value}>{value}</td>)}
            {method.map((value) => <td key={value}>{value}</td>)}
            {value.map((value) => <td key={value}>{value}</td>)}
            {currency.map((value) => <td key={value}>{value}</td>)}
            {askRate.map((value) => <td key={value}>{value.toFixed(2)}</td>)}
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  description: state.wallet.expenses.map((value) => value.description),
  tag: state.wallet.expenses.map((value) => value.tag),
  method: state.wallet.expenses.map((value) => value.method),
  value: state.wallet.expenses.map((coin) => coin.value),
  currency: state.wallet.expenses.map((value) => value.exchangeRates[value.currency].name),
  askRate: state.wallet.expenses.map((value) => parseFloat(value.exchangeRates[value.currency].ask)),
})

export default connect(mapStateToProps)(ExpensesTable);

