import React from 'react';

class SelectPagamento extends React.Component {
  render() {
    return (
      <label>Metodo de pagamento
        <select data-testid="method-input" onChange={this.props.metodoPagamento}>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    )
  }
}

export default SelectPagamento;
