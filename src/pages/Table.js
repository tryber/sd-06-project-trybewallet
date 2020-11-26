import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableBody from './TableBody';

class Table extends Component {
  render() {
    const { expenses, editExpense } = this.props;
    const campos = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            { campos.map((campo, i) => (<th key={ i }>{ campo }</th>)) }
          </tr>
        </thead>
        <TableBody handleClickExpense={ editExpense } expenses={ expenses } />
      </table>
    );
  }
}

Table.propTypes = {
  editExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps)(Table);
