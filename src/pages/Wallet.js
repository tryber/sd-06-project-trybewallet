import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
// import {  } from 'react-icons/fa';
// import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
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
