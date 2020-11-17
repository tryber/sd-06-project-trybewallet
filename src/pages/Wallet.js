import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';
import Footer from '../components/Footer';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <Table />
        <Footer />
      </div>
    );
  }
}

export default Wallet;
