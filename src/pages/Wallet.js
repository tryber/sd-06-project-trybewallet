import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { totalValue } = this.props;
    return (
      <div>
        <Header totalValue={ totalValue } />
        <ExpenseForm />
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  totalValue: propTypes.number.isRequired,
};
