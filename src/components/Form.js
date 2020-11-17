import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="value">
          R$
          <input
            data-testid="value-input"
            id="value"
            type="number"
          />
        </label>
      </form>
    );
  }
}

export default Form;
