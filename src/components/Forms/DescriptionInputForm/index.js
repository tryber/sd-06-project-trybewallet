import React from 'react';

class DescriptionInputForm extends React.Component {
  render() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
        />
      </label>
    );
  }
}

export default DescriptionInputForm;
