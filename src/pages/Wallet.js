import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import PageHeader from '../components/PageHeader';
// import {  } from 'react-icons/fa';
// import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <PageHeader />
        <ExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;

// const mapStateToProps = (state) => ({
//   nomeRandom: state.wallet.hello,
// });

// export default connect(
//   mapStateToProps,
// )(Wallet);
