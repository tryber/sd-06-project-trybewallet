import React from 'react';

import fetchApi from '../../data';

function Form() {
  const dropdown = async () => {
    const response = await fetchApi();
    console.log(response);
  };

  dropdown();
  return (
    <div>
      <input data-testid="value-input" />
      <input data-testid="description-input" />
      <select id="currency" data-testid="currency-input">
        <option>1</option>
      </select>
    </div>
  );
}

export default Form;
