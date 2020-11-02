import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';
import logo from '../images/logo.png';

class Header extends React.Component {
  totalExpenses(listOfExpense) {
    if (listOfExpense != null && listOfExpense.length === 0) {
      return 0;
    }
    let sumExpenses = 0;
    listOfExpense.forEach((expense) => {
      sumExpenses += parseFloat(expense.value);
    });
    return sumExpenses;
  }

  render() {
    const { email, wallet } = this.props;
    return (
      <header className="form-header">
        <img src={ logo } alt="logo-trybe" />
        <span>E-mail:</span>
        <span data-testid="email-field">{ email }</span>
        <span>Despesa Total:</span>
        <span data-testid="total-field">
          { this.totalExpenses(wallet.expenses) }
        </span>
        <span>Câmbio utilizado:</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Header);
