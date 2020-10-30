import React from 'react';

class TableLine extends React.Component {
  render() {
    return (
      <div>
        <td>
          <button type="button" data-testid="edit-btn">Editar</button>
          <button type="button" data-testid="delete-btn">Excluir</button>
        </td>
      </div>
    );
  }
}

export default TableLine;
