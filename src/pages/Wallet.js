import React from 'react';
import { connect } from 'react-redux';

import '../styles/Wallet.css';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
