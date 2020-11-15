import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseFormEdit from '../components/ExpenseFormEdit';
import ExpensesTable from '../components/ExpensesTable';
import PageHeader from '../components/PageHeader';

class Wallet extends React.Component {
  render() {
    const { editMode } = this.props;

    return (
      <div>
        <PageHeader />
        {editMode ? <ExpenseFormEdit /> : <ExpenseForm />}
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editMode: state.wallet.isEditing,
});

export default connect(
  mapStateToProps,
)(Wallet);

Wallet.propTypes = {
  editMode: PropTypes.bool.isRequired,
};
