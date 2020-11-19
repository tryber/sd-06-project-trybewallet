import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.calculateExpenses = this.calculateExpenses.bind(this);
  }

  calculateExpenses() {
    const { expenses } = this.props;
    const costs = expenses
      .map((e) => parseFloat(e.value) * parseFloat(e.exchangeRates[e.currency].ask));

    return costs.reduce((acc, x) => acc + x, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{this.calculateExpenses()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, wallet } = state;
  return { email: user.email, expenses: wallet.expenses };
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
