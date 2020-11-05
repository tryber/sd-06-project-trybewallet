import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses() {
    const { expenses } = this.props;

    const mapeado = expenses.map((element) => element.currency);
    const currentQuot = expenses.map((element) => element.exchangeRates[mapeado].ask);
    const total = expenses
      .reduce((acc, curr) => (Number(acc) + (Number(curr.value) * currentQuot)), 0);
    return Math.round(total * 10) / 10;
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <span>Email:</span>
        <span data-testid="email-field">{ email }</span>
        <br />
        <span>Depesa Total: R$</span>
        <span data-testid="total-field">
          {this.sumExpenses()}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = { email: PropTypes.shape.isRequired };

export default connect(mapStateToProps)(Header);
