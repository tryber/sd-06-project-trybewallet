import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class WalletTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderTableContents = this.renderTableContents.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  edit(type, id) {
    const { editExpense } = this.props;
    editExpense(type, id);
  }

  handleClick(id) {
    const { data, delExpense } = this.props;
    const expenses = [...data];
    const filteredExpenses = expenses
      .filter((item) => item.id !== id);
    delExpense(filteredExpenses);
    this.edit('del');
  }

  renderTableContents() {
    const { data } = this.props;
    if (data) {
      return (
        data.map((item) => (
          <tr key={ item.id }>
            <td>{item.description}</td>
            <td>{item.tag}</td>
            <td>{item.method}</td>
            <td>{item.value}</td>
            <td>Real</td>
            <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
            <td>
              {parseFloat(item.exchangeRates[item.currency].ask * item.value)
                .toFixed(2)}
            </td>
            <td>{item.exchangeRates[item.currency].name}</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.edit('edit', item.id) }
              >
                Edit
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleClick(item.id) }
              >
                Del
              </button>
            </td>
          </tr>
        ))
      );
    }
  }

  render() {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableContents()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({ data: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  delExpense: (updatedData) => dispatch(deleteExpense(updatedData)),
});

WalletTable.propTypes = {
  editExpense: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  delExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
