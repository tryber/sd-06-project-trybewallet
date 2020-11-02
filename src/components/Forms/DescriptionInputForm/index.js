import React from 'react';
import PropTypes from 'prop-types';

class DescriptionInputForm extends React.Component {
  render() {
    const { genericHandleChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
          onChange={ (event) => genericHandleChange(event) }
        />
      </label>
    );
  }
}

DescriptionInputForm.propTypes = {
  genericHandleChange: PropTypes.func.isRequired,
};

export default DescriptionInputForm;
