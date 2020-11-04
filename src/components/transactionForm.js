import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/transactionForm.css';

class TransactionForm extends Component {
  render() {
    return (
      <div>
        <div className="table">
          <div className="table-header">Descrição</div>
          <div className="table-header">Tag</div>
          <div className="table-header">Método de pagamento</div>
          <div className="table-header">Valor</div>
          <div className="table-header">Moeda</div>
          <div className="table-header">Câmbio utilizado</div>
          <div className="table-header">Valor convertido</div>
          <div className="table-header">Moeda de conversão</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(TransactionForm);
