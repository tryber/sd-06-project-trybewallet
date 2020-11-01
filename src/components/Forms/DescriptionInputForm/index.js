import React from 'react';

class DescriptionInputForm extends React.Component {
  render() {
    const { descriptionOnChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
          onChange={ ({ target }) => descriptionOnChange(target.value) }
        />
      </label>
    );
  }
}

export default DescriptionInputForm;
