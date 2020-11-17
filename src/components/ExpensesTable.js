import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseRow from './ExpenseRow';
import ExpenseHeader from './ExpenseHeader';
import '../css/ExpenseTable.css';

class ExpensesTable extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <table className="expense-table">
        <ExpenseHeader />
        <tbody>
          { expenses.map((expense) => (
            <ExpenseRow key={ expense.id } expenseToRender={ expense } />
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(
  mapStateToProps,
)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
