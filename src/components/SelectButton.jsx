import React from 'react';
import PropTypes from 'prop-types';

const SelectButton = (props) => {
  const { onChange, optionSelected, datatestid, options } = props;
  return (
    <select onChange={ onChange } data-testid={ datatestid }>
      {options.map((option) => (
        <option
          key={ option }
          data-testid={ option }
          checked={ optionSelected === option }
          value={ option }
        >
          {option}
        </option>
      ))}
    </select>
  );
};

SelectButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  optionSelected: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
};

export default SelectButton;
