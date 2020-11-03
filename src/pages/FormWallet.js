import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayHeaderTable } from './arraysWallet';

class FormWallet extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {arrayHeaderTable.map((topic) => <th key={ topic }>{ topic }</th>)}
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Nome:</td>
            <td>Odontodactylus scyllarus.</td>
          </tr> */}
          {expenses.map(({
            id,
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
          }) => {
            const descriptionCurrency = exchangeRates[currency];
            const { name, ask } = descriptionCurrency;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ name }</td>
                <td>{ parseFloat(ask).toFixed(2) }</td>
                <td>
                  {parseFloat((parseFloat(ask) * parseFloat(value)).toFixed(2))}
                </td>
                <td>Real</td>
              </tr>);
          })}
        </tbody>
      </table>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const arrayCoins = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF',
  'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
FormWallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    exchangeRates: PropTypes.shape(
      arrayCoins.reduce((total, coin) => (
        { ...total,
          [coin]: PropTypes.shape({
            ask: PropTypes.string.isRequired,
          }),
        }
      ), {}),
    ),
    currency: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(FormWallet);
