import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header titulo="Oba! Vamos planejar!" />
        <WalletHeader />
        <Link to="/">Voltar para home</Link>
      </>
    );
  }
}

export default Wallet;
