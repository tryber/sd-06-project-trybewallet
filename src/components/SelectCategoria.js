import React from 'react';

class SelectCategoria extends React.Component {
  render() {
    return (
      <label>Metodo de pagamento
        <select data-testid="tag-input" name="tag" onChange={ this.props.handleChange }>
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