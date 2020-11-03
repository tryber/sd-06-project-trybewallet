import React from 'react';

class SelectCategoria extends React.Component {
  render() {
    return (
      <label>Metodo de pagamento
        <select data-testid="tag-input" onChange={ this.props.metodoCategoria }>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    )
  }
}

export default SelectCategoria;