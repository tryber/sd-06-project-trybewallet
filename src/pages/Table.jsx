import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(newExpenses) {
    const currencyUsed = Object.values(newExpenses.exchangeRates)
      .find((coin) => coin.code === newExpenses.currency);

    const decimalsAllowed = 2;
    const convertedValue = parseFloat(currencyUsed.ask * newExpenses.value)
      .toFixed(decimalsAllowed);

    return (
      <tr id={ newExpenses.id }>
        <td>
          {newExpenses.description}
        </td>
        <td>
          {newExpenses.tag}
        </td>
        <td>
          {newExpenses.method}
        </td>
        <td>
          {newExpenses.value}
        </td>
        <td>
          {currencyUsed.name}
        </td>
        <td>
          {parseFloat(currencyUsed.ask).toFixed(decimalsAllowed)}
        </td>
        <td>
          {convertedValue}
        </td>
        <td>Real</td>
      </tr>

    );
  }

  render() {
    const { expenses } = this.props;
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
            </tr>
          </thead>
          {expenses.length !== 0 && expenses.map((newExpenses) => this.renderItems(newExpenses))}
        </table>
        <button type="submit">Editar/Excluir</button>
      </div>
    );

    console.log(newExpenses);
  }
}

function mapStateToProps(state) {
  return { expenses: state.wallet.expenses };
}
Table.propTypes = {
  map: PropTypes.func.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Table);
