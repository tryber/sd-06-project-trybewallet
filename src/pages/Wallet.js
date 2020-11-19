import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderPage from '../components/Header';
import FormWalletPage from '../components/FormWallet';

export class Wallet extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <HeaderPage />
        <FormWalletPage />
        <section>
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
          {expenses.map((expenseX) => {
            const {
              description: descriptionValue,
              tag: tagValue,
              method: methodValue,
              value: valueValue,
              currency: currencyValue,
              exchangeRates: exchangeRatesValue,
              id: idValue,
            } = expenseX;

            const mil = 10000;

            const roundValue = Math.round(parseFloat(valueValue) * mil) / mil;

            const roundRate = Math.round(
              parseFloat(exchangeRatesValue[currencyValue].ask) * mil,
            ) / mil;

            const roundRateToTable = Math.round(
              parseFloat(exchangeRatesValue[currencyValue].ask) * 100,
            ) / 100;

            return (
              <tr key={ idValue }>
                <td>{descriptionValue}</td>
                <td>{tagValue}</td>
                <td>{methodValue}</td>
                <td>{roundValue}</td>
                <td>{exchangeRatesValue[currencyValue].name}</td>
                <td>{roundRateToTable}</td>
                <td>{roundValue * roundRate}</td>
                <td>
                  {exchangeRatesValue[currencyValue].codein === 'BRL'
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
