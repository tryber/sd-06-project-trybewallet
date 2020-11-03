import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  render() {
    console.log(store);
    const { userEmail } = this.props;
    console.log(userEmail);
    return (
      <div>
        <header>
          <h6 data-testid="email-field">{userEmail}</h6>
          <h6 data-testid="total-field">0</h6>
          <h6 data-testid="header-currency-fiell">BRL</h6>
        </header>
        <ExpensesForm />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});
Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
