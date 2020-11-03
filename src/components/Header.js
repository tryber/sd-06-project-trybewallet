import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.exchangeCurrency = this.exchangeCurrency.bind(this);
  }

  exchangeCurrency() {
    const { expenses } = this.props;

    const exchangedValues = expenses.map((expense) => (
      Number(expense.exchangeRates[expense.currency].ask) * expense.value
    ));
    return exchangedValues;
  }

  render() {
    const { user } = this.props;
    return (
      <div className="header-container">
        <header>
          <span className="header-child" data-testid="email-field">{user}</span>
          <span className="header-child" data-testid="total-field">
            Total despesas R$
            { this.exchangeCurrency().length === 0
              ? 0.00
              : Math.round(this.exchangeCurrency().reduce((sum, item) => (
                Number(sum) + Number(item)
              ), 0) * 100) / 100}
          </span>
          <span className="header-child" data-testid="header-currency-field">BRL</span>
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
