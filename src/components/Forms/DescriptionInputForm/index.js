import React from 'react';

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

export default DescriptionInputForm;
