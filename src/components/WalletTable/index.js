import React from 'react';
// import { connect } from 'react-redux';

import './style.css';

import ValueInputForm from '../Forms/ValueInputForm';
import CurrencyNameForm from '../Forms/CurrencyNameForm';
import PaymentMethodForm from '../Forms/PaymentMethodForm';
import TagInputForm from '../Forms/TagInputForm';
import DescriptionInputForm from '../Forms/DescriptionInputForm';

class WalletTable extends React.Component {
  constructor() {
    super();
    this.state = {
      valueBRL: 0,
      currencyName: '',
      isValid: false,
    };

    this.valueBRLOnChange = this.valueBRLOnChange.bind(this);
  }

  valueBRLOnChange(value) {
    console.log('o valor é:', value);
  }

  render() {
    const { isValid } = this.state;
    return (
      <form>
        <ValueInputForm valueBRLOnChange={ this.valueBRLOnChange } />
        <CurrencyNameForm />
        <PaymentMethodForm />
        <TagInputForm />
        <DescriptionInputForm />
        <button type="submit" disabled={ !isValid }>Adicionar despesa</button>
      </form>
    );
  }
}

export default WalletTable;
