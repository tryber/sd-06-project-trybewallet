import React, { Component } from 'react';
import { btnEdit } from '../actions';

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

// const mapStateToProps = (state) => ({
//   btnEdit: (btnEdit) => dispatch(btnEdit(btnEdit)),
// });

export default BtnEditState;
