import { connect } from 'react-redux';
import React from 'react';

class Header extends React.Component {
  constructor() {
    super();

    this.handleReducer = this.handleReducer.bind(this);
  }

  handleReducer() {
    const { allExpenses, eachExpense, eachBid } = this.props;
    
    if (allExpenses.length > 0) {
      const updatedValue = eachExpense.reduce((acc, curr, index) => {
        return (acc + (curr * eachBid[index]))
      }, 0);
      return updatedValue.toFixed(2);
    } else {
      return 0;
    }
  }

  render() {
    const { email, } = this.props;
    const totalValue = this.handleReducer();

    return(
      <header className="header">
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          Despesa Total: 
          {` ${totalValue} `}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  allExpenses: state.wallet.expenses,
  eachBid: state.wallet.expenses.map((value) => parseFloat(value.exchangeRates[value.currency].ask)),
  eachExpense: state.wallet.expenses.map((coin) => parseFloat(coin.value))
});

export default connect(mapStateToProps)(Header);
