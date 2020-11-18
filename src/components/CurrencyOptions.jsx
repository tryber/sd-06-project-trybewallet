import React from 'react';

class CurrencyOptions extends React.Component {
  render() {
    const { eachCoin } = this.props;
    return(
      <option data-testid={ `${eachCoin}` } value={eachCoin}>{eachCoin}</option>
    )
  }
}

export default CurrencyOptions;
