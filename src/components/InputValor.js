import React from 'react';

class InputValor extends React.Component {
  render() {
    return(
      <div>
        <label>Valor :
          <input type="text" name="value" data-testid="value-input" value={ this.props.value } onChange={ this.props.handleChange } />
        </label>
    </div>
    );
  }
}

export default InputValor;