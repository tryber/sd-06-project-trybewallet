import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import AddExpenses from '../components/AddExpenses';
import Expenses from '../components/Expenses';
// import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    // const { loggedIn } = this.props;
    return (
      <div>
        {/* {(!loggedIn) ? <Redirect to="/" /> : null } */}
        <Header />
        <AddExpenses />
        <Expenses />
      </div>);
  }
}

Wallet.propTypes = {
  // loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(Wallet);
