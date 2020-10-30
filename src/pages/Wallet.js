import React, { Component } from 'react';
import Forms from '../components/Forms';
import Header from '../components/Header';

class Wallet extends Component {
  render() {
    return (
      <section>
        <Header />
        <Forms />
      </section>
    );
  }
}

export default Wallet;
