import React, { Component } from 'react';

class BtnEditState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { btnEdit } = this.props;
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

// const mapStateToProps = (state) => ({
//   btnEdit: state.wallet.btnEdit,
// });

export default BtnEditState;

BtnEditState.propTypes = {
  btnEdit: func.isRequired,
};
