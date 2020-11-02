import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <div className="header-container">
        <header>
          <p data-testid="email-field">{user}</p>
          <p data-testid="total-field">
            Despesas:
            { expenses.length === 0
              ? 0.00
              : Math.round(expenses.reduce((sum, expense) => (
                Number(sum) + Number(expense.value)
              ), 0) * 100) / 100}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
