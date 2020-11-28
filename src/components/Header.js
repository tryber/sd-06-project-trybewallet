import React from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.calcExpenses = this.calcExpenses.bind(this);
  }

  calcExpenses() {
    const { despesas } = this.props;
    if (despesas.length > 0) {
      const moeda = despesas.reduce((despesa, nextvalue) => {
        const asked = nextvalue.exchangeRates[nextvalue.currency].ask;
        // return despesa + (nextvalue.exchangeRates[nextvalue.currency].ask * nextvalue.value);
        return despesa + (asked * nextvalue.value);
      }, 0);
      return parseFloat(moeda).toFixed(2);
    }
    return 0;
  }

  render() {
    const { email } = this.props;
    const total = this.calcExpenses();
    return (
      <div className="main-content">
        <div className="trybe-header">
          <h2>TRYBE WALLET</h2>
        </div>
        <div className="info-header">
          <h4 data-testid="email-field">{email}</h4>
          <h4>
            <span data-testid="total-field">
              Despesa total: R$
              {`${total}`}
            </span>
            <span data-testid="header-currency-field"> BRL</span>
          </h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
});

export default connect(
  mapStateToProps,
)(Header);
