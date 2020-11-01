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
      paymentType: '',
      tagType: '',
      isValid: false,
    };

    this.valueBRLOnChange = this.valueBRLOnChange.bind(this);
    this.currencyOnChange = this.currencyOnChange.bind(this);
    this.paymentOnChange = this.paymentOnChange.bind(this);
    this.tagOnChange = this.tagOnChange.bind(this);
    this.descriptionOnChange = this.descriptionOnChange.bind(this);
  }

  valueBRLOnChange(value) {
    console.log('o valor é:', value);
  }

  currencyOnChange(value) {
    console.log('a moeda é:', value);
  }

  paymentOnChange(value) {
    console.log('O modo é:', value);
  }

  tagOnChange(value) {
    console.log('A categoria é:', value);
  }

  descriptionOnChange(value) {
    console.log('A descrição é', value);
  }

  render() {
    const { isValid } = this.state;
    return (
      <form>
        <ValueInputForm valueBRLOnChange={ this.valueBRLOnChange } />
        <CurrencyNameForm currencyOnChange={ this.currencyOnChange } />
        <PaymentMethodForm paymentOnChange={ this.paymentOnChange } />
        <TagInputForm tagOnChange={ this.tagOnChange } />
        <DescriptionInputForm descriptionOnChange={ this.descriptionOnChange } />
        <button type="submit" disabled={ !isValid }>Adicionar despesa</button>
      </form>
    );
  }
}

export default WalletTable;
