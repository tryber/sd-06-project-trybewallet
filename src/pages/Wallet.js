import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import { wallet } from '../actions';

class Wallet extends React.Component {
  render() {
    return (
    <div>
      <Header />
      <Expenses />
    </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email
});

const mapDispatchToProps = (dispatch) => ({
  wallet: (data) => dispatch(wallet(data))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(Wallet);
