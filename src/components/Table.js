import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);
    this.tBody = this.tBody.bind(this);

    this.state = { expenses: props.expenses };
  }

  tBody(expense, index) {
    const { currency, description, tag, method, value, exchangeRates, id } = expense;
    const CURRENCY_DATA = Object.values(exchangeRates).find((coin) => coin.code === currency);
    console.log(CURRENCY_DATA);
    return (
      <tr
        key={ `${currency}${id}${index}` }
      >
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currency }</td>
        <td>
          { Math.round(100 * CURRENCY_DATA.ask) / 100 }
        </td>
        <td>
          { Math.round(100 * CURRENCY_DATA.ask * expense.value) / 100 }
        </td>
        <td>
          { CURRENCY_DATA.name }
        </td>
        <td>Real</td>
      </tr>);
  }

  render() {
    const { expenses } = this.state;
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
          <tbody>
            {Object.values(expenses).map((expense, index) => this.tBody(expense, index))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps)(Table);
