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
  disabled: false,
  onClick: () => {},
};

AddButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AddButton;
