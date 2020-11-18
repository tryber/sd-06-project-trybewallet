import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableBody from './TableBody';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    const campos = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <table>
        <thead>
          <tr>
            { campos.map((campo, i) => (<th key={ i }>{ campo }</th>)) }
          </tr>
        </thead>
        <TableBody expenses={ expenses } />
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
