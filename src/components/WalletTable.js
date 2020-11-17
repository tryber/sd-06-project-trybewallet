import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletTableBody from './WalletTableBody';

class WalletTable extends Component {
  render() {
    const { expenses } = this.props;

    const fields = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <table>
        <thead>
          <tr>
            { fields.map((field, index) => (<th key={ index }>{ field }</th>)) }
          </tr>
        </thead>
        <WalletTableBody expenses={ expenses } />
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletTable);
