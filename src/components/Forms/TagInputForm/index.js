import React from 'react';

class TagInputForm extends React.Component {
  render() {
    const { genericHandleChange } = this.props;
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          className="tag"
          onChange={ (event) => genericHandleChange(event) }
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
