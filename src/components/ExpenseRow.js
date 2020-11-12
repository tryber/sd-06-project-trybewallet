import React from 'react';

class ExpenseRow extends React.Component {
  render() {
    const { label } = this.props;
    return (
      <td>{`É o(a) ${label}`}</td>
    );
  }
}

export default ExpenseRow;
