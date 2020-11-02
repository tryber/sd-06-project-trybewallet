import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpenses from '../components/AddExpenses';
import Expenses from '../components/Expenses';
// import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { Loading } from '../components/Loading';

class Wallet extends React.Component {
  render() {
    const { isFetching } = this.props;
    // const { loggedIn } = this.props;
    return (
      <div>
        {/* {(!loggedIn) ? <Redirect to="/" /> : null } */}
        <Header />
        <AddExpenses />
        <Expenses />
        {/* {(isFetching) ? <Loading /> : <Expenses />} */}
      </div>);
  }
}

Wallet.propTypes = {
  // loggedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(Wallet);
