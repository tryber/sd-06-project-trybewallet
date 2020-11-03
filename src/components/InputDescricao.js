import React from 'react';

class InputDescricao extends React.Component {
  render() {
    return(
      <div>
        <label>Descricao :
          <input type="text" data-testid="description-input" onChange={ this.props.metodoDescricao } />
        </label>
    </div>
    );
  }
}

export default InputDescricao;