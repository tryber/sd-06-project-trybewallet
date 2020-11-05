import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expensesStore } = this.props;
    return (
      <div>
        <table style={ { borderStyle: 'solid', color: 'blue' } }>
          <thead>
            <th style={ { borderStyle: 'ridge' } }>Descrição</th>
            <th style={ { borderStyle: 'ridge' } }>Tag</th>
            <th style={ { borderStyle: 'ridge' } }>Método de pagamento</th>
            <th style={ { borderStyle: 'ridge' } }>Valor</th>
            <th style={ { borderStyle: 'ridge' } }>Moeda</th>
            <th style={ { borderStyle: 'ridge' } }>Câmbio utilizado</th>
            <th style={ { borderStyle: 'ridge' } }>Valor convertido</th>
            <th style={ { borderStyle: 'ridge' } }>Moeda de conversão</th>
            <th style={ { borderStyle: 'ridge' } }>Editar/Excluir</th>
          </thead>
          <tbody style={ { color: 'black' } }>
            {expensesStore.map((expense, index) => {
              const currencyRate = Number(expense.exchangeRates[expense.currency].ask);
              const currencyName = expense.exchangeRates[expense.currency].name;
              const convertedExpense = currencyRate * expense.value;
              return (
                <tr key={ index } style={ { textAlign: 'center' } }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>{currencyRate.toFixed(2)}</td>
                  <td>{currencyName}</td>
                  <td>{convertedExpense.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button type="button" data-testid="edit-btn">Editar</button>
                    <button type="button" data-testid="delete-btn">Excluir</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

/* Gostaria de deixar aqui um agradecimento especial ao Luiz Simões pela ajuda para
que eu pudesse chegar aos 80% desse projeto hoje. Me ajudou tanto na lógica do reducer
quanto na construção da tabela. Deixo também o link do PR dele que me ajudou a acertar
alguns detalhes da implementação deste requisito:
https://github.com/tryber/sd-06-project-trybewallet/pull/53/files */

const mapStateToProps = (state) => ({
  expensesStore: state.wallet.expenses,
});

Table.propTypes = {
  expensesStore: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);
