import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.handleExpenses = this.handleExpenses.bind(this);
  }

  handleExpenses() {
    const { totalExpenses } = this.props;
    const ZERO = 0;

    if (totalExpenses.length === ZERO) return 0;
    return totalExpenses[0];
  }

  render() {
    const { login } = this.props;

    return (
      <div>
        <div data-testid="email-field">
          { login }
        </div>
        <div data-testid="total-field">
          Despesa total:
          { this.handleExpenses() }
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  totalExpenses: state.wallet.expenses,
});

Header.propTypes = {
  login: PropTypes.string.isRequired,
  totalExpenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Header);
