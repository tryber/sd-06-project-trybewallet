import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';
import './wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-container">
        <Header />
        <Form />
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(Wallet);
