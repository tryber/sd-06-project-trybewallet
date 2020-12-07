import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wallet from '../img/wallet.jpg';

class Header extends React.Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { cashSum } = this.props;
    if (cashSum.length > 0) {
      const cashItems = cashSum.reduce((acc, cur) => {
        const askReturn = cur.exchangeRates[cur.currency].ask;
        return acc + askReturn * cur.value;
      }, 0);
      return cashItems.toFixed(2);
    } return 0;
  }

  render() {
    const { email } = this.props;
    const cash = this.sumExpenses();

    return (
      <header className="header-content">
        <div>
          <h1 className="header-title">
            <img src={ Wallet } alt="Wallet" width="80" />
            Trybe Wallet
          </h1>
          <h3 data-testid="email-field">
            Email:
            { email }
          </h3>
          <h3 data-testid="total-field">
            Despesas totais:
            { cash }
          </h3>
          <h3 data-testid="header-currency-field">
            BRL
          </h3>
        </div>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  cashSum: state.wallet.expenses,
});

export default connect(
  mapStateToProps,
)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  cashSum: PropTypes.arrayOf(PropTypes.array).isRequired,
};
