import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const fieldArray = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    const { expenses } = this.props;
    return (
      <table border="1">
        <thead>
          <tr>
            {fieldArray.map((header, index) => <td key={ index }>{ header }</td>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => {
            const exchangeValue = Number(element.exchangeRates[element.currency].ask);
            const currencyName = element.exchangeRates[element.currency].name;
            const convertedValue = exchangeValue * element.value;
            return (
              <tr key={ element.id }>
                <td>{ element.description }</td>
                <td>{ element.tag }</td>
                <td>{ element.method }</td>
                <td>{ element.value }</td>
                <td>{ currencyName }</td>
                <td>{ exchangeValue.toFixed(2)}</td>
                <td>{ convertedValue.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    disabled
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleRemoval(element.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeItem(id)),
});

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
