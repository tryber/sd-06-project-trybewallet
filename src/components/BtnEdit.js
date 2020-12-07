import React, { Component } from 'react';

class BtnEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const btnEdit = this.props;
    return (
      <form>
        {
          (btnEdit)
            ? (
              <button
                type="button"
                onClick={ this.handleEdit }
                data-testid="edit-btn"
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
        }
      </form>
    );
  }
}

export default BtnEdit;
