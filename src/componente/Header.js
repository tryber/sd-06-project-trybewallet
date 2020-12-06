import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    return (
      <div>
        <p data-testid="email-field">
          Email:
          {email}
          .
        </p>
        <p
          data-testid="total-field"
        >
          Dispesa total:
          {expenses.reduce((acc, current) => {
            const { currency, exchangeRates, value } = current;
            const totalValue = (exchangeRates[currency].ask) * value;
            const valueParseFloat = acc + parseFloat(totalValue);
            return valueParseFloat;
          }, 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">cambio: BRL</p>
      </div>
    );
  }
}

const mapStateToPro = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.object,
}.isRequired;

export default connect(mapStateToPro)(Header);
