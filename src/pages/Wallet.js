import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderPage from '../components/Header';
import WalletPage from '../components/Wallet';

export class Wallet extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <HeaderPage />
        <WalletPage />
        <br />
        <section>
          <tr>
            <th>Descrição </th>
            <th>Tag </th>
            <th>Método de pagamento </th>
            <th>Valor </th>
            <th>Moeda </th>
            <th>Câmbio utilizado </th>
            <th>Valor convertido </th>
            <th>Moeda de conversão </th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map((expensesTaked) => {
            const {
              description: descriptions,
              tag: tags,
              method: methods,
              value: values,
              currency: currencies,
              exchangeRates: exchanges,
              id: idValue,
            } = expensesTaked;

            const mil = 10000;

            const roundValue = Math.round(parseFloat(values) * mil) / mil;

            const roundRate = Math.round(
              parseFloat(exchanges[currencies].ask) * mil,
            ) / mil;

            const roundRateToTable = Math.round(
              parseFloat(exchanges[currencies].ask) * 100,
            ) / 100;

            return (
              <tr key={ idValue }>
                <td>{descriptions}</td>
                <td>{tags}</td>
                <td>{methods}</td>
                <td>{roundValue}</td>
                <td>{exchanges[currencies].name}</td>
                <td>{roundRateToTable}</td>
                <td>{roundValue * roundRate}</td>
                <td>
                  {exchanges[currencies].codein === 'BRL'
                    ? 'Real'
                    : ''}
                </td>
              </tr>
            );
          })}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
