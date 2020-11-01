import React from 'react';

class TagInputForm extends React.Component {
  render() {
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          className="tag"
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
