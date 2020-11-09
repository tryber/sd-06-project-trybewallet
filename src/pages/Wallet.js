import React from 'react';
import { connect } from 'react-redux';

import '../styles/Wallet.css';
import Header from '../components/Header';
import AddExpenseForm from '../components/AddExpenseForm';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
      description: '',
    };
  }

  render() {
    return (
      <div>
        <Header />
        <AddExpenseForm />
        {/* <button type="button" onClick={() => currencyAPI() }>Teste API</button> */}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
