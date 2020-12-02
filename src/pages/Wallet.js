import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../wallet_components/WalletHeader';
import ExpenseForm from '../wallet_components/ExpenseForm';
import EditForm from '../wallet_components/EditForm';
import ExpensesTable from '../wallet_components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <WalletHeader />
        { isEditing ? <EditForm /> : <ExpenseForm /> }
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.editingExpense,
});

Wallet.propTypes = {
  isediting: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
