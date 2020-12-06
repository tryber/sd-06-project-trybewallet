import React, { Component } from 'react';

class BtnEditState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const btnEditState = this.props;
    return (
      <form>
        {
          (btnEditState)
            ? (
              <button type="button" onClick={ this.handleEdit }>
                Editar despesa
              </button>
            )
            : (
              <button onClick={ this.handleClick } type="button">
                Adicionar despesa
              </button>
            )
        }
      </form>
    );
  }
}

export default BtnEditState;
