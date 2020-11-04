import React from 'react';

class InputDescricao extends React.Component {
  render() {
    return(
      <div>
        <label>Descricao :
          <input type="text" name="description" data-testid="description-input" onChange={ this.props.handleChange } />
        </label>
    </div>
    );
  }
}

export default InputDescricao;