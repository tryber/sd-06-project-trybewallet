import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import ExpenseTable from '../components/ ExpenseTable';

class Wallet extends React.Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{userEmail}</h3>
          <h3 data-testid="total-field">{totalExpenses.toFixed(2)}</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <ExpensesForm />
        <ExpenseTable />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});
Wallet.propTypes = {
  userEmail: PropTypes.string,
  totalExpenses: PropTypes.number,
};
Wallet.defaultProps = {
  userEmail: '',
  totalExpenses: 0,
};

export default connect(mapStateToProps, null)(Wallet);
