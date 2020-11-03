import React from 'react';

class InputValor extends React.Component {
  render() {
    return(
      <div>
        <label>Valor :
          <input type="text" data-testid="value-input" onChange={this.props.metodoValor} />
        </label>
    </div>
    );
  }
}

export default InputValor;