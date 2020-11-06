import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header title="Plano de viagem" />
        <WalletHeader />
        <Link to="/">Voltar</Link>
      </>
    );
  }
}

export default Wallet;
