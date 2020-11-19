import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;

    const fields = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <div>
        <table>
          <thead>
            <tr>
              {fields.map((element) => <th key={ element }>{element}</th>)}
            </tr>
          </thead>
          <tbody>
            {expenses.map((element) => {
              const askValue = Number(element.exchangeRates[element.currency].ask);
              return (
                <tr key={ element.id }>
                  <td>{ element.description }</td>
                  <td>{ element.tag }</td>
                  <td>{ element.method }</td>
                  <td>{ element.value }</td>
                  <td>{ element.exchangeRates[element.currency].name }</td>
                  <td>{ askValue.toFixed(2) }</td>
                  <td>{element.value * askValue }</td>
                  <td>Real</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { wallet } = state;
  return { expenses: wallet.expenses };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
