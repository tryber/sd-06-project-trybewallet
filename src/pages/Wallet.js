import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Form/>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(Wallet);
