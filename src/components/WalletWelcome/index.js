import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletWelcome extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Olá,
          <span>{ email }</span>
          seja bem-vindx!
          <span role="img" aria-label="coração verde">💚</span>
          <span data-testid="header-currency-field">Total em BRL R$</span>
          <span data-testid="total-field">
            {/* como visto no PR da colega Laís Gurgel <3 */}
            { expenses.reduce((previewValue, expense) => {
              const { currency, exchangeRates, value } = expense;

              const exchange = exchangeRates[currency].ask; // <3 <3
              const finalBRLValue = exchange * value;

              return previewValue + parseFloat(finalBRLValue);
            }, 0).toFixed(2)}
          </span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

WalletWelcome.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletWelcome);
