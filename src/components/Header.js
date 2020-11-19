import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();

    this.totalValue = this.totalValue.bind(this);
  }

  totalValue() {
    const { expenses } = this.props;

    return expenses.reduce((acc, curr) => {
      const { currency, exchangeRates, value } = curr;

      const totalValue = (exchangeRates[currency].ask) * value;
      const toHitParseFloat = acc + parseFloat(totalValue);

      return toHitParseFloat;
    }, 0).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div className="header_container">
          <div>
            <p data-testid="email-field">
              Email:
              {' '}
              {email}
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              Despesa Total:
              {this.totalValue()}
            </p>
          </div>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Header);
