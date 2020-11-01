import React from 'react';

class TagInputForm extends React.Component {
  render() {
    const { tagOnChange } = this.props;
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          className="tag"
          onChange={ ({ target }) => tagOnChange(target.value) }
        >
          {categories.map(
            (category) => <option key={ `${category}` }>{category}</option>,
          )}
        </select>
      </label>
    );
  }
}

export default TagInputForm;
