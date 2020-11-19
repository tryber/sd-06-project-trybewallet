import React from 'react';

import { Header, FormWallet, TableWallet } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormWallet />
        <TableWallet />
      </>
    );
  }
}

export default Wallet;
