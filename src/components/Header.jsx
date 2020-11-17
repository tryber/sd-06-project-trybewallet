import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import trybeWallet from '../pages/trybeWallet.png';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <nav className="header-nav">
        <Link className="header-link" to="/">
          <img src={ trybeWallet } alt="Logo" width="100px" />
        </Link>
        <section data-testid="email-field">{ `Email:${email}` }</section>
        <section data-testid="total-field">
          Despesa Total: R$
          {expenses.reduce((acc, expense) => {
            const { currency, exchangeRates, value } = expense;
            const exchangeRate = exchangeRates[currency].ask;
            const costInBRL = exchangeRate * value;
            return acc + parseFloat(costInBRL);
          }, 0).toFixed(2)}
          <span data-testid="header-currency-field">{` ${'BRL'}`}</span>
        </section>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
