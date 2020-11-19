import React from 'react';
import PropTypes from 'prop-types';

class AddButton extends React.Component {
  render() {
    const { onClick } = this.props;

    return (
      <button
        type="button"
        onClick={ onClick }
      >
        Adicionar despesa
      </button>
    );
  }
}

AddButton.defaultProps = {
  onClick: () => {},
};

AddButton.propTypes = {
  onClick: PropTypes.func,
};

export default AddButton;
