import React from 'react';
import ExpenseRow from './ExpenseRow';
import ExpenseHeader from './ExpenseHeader';

class ExpensesTable extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <ExpenseHeader />
        </tr>
        <tr>
          <ExpenseRow label="Descrição" />
          <ExpenseRow label="Tag" />
        </tr>
      </table>
    );
  }
}

export default ExpensesTable;
