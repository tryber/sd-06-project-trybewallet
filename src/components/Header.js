import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { login, expenses } = this.props;
    let totalExpenses = 0;

    if (expenses.length > 0) {
      totalExpenses = expenses.reduce((acc, currentValue) => {
        const { currency, exchangeRates, value } = currentValue;

        const exchangeRateToBRL = exchangeRates[currency].ask;
        const valueInBRL = value * exchangeRateToBRL;

        return acc + valueInBRL;
      }, 0);
    }

    return (
      <div className="header-wallet">
        <div data-testid="email-field">
          Isso é um header c/ o login de
          {` ${login}`}
        </div>
        <div data-testid="total-field">
          Total expenses:
          {` ${totalExpenses} `}
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(
  mapStateToProps,
)(Header);

Header.propTypes = {
  login: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
