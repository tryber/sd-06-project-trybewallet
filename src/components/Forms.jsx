import React, { Component } from 'react';
import fetchApi from '../services';

class Forms extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      forms: {
        moeda: 'USD',
        valor: 'Dinheiro',
        tag: 'Alimentação',
      },
      isFetching: true, 
    };
  }

  async componentDidMount() {
    const currencies = await fetchApi();

    this.setState({ currencies: Object.keys(currencies) }, () => {
      this.setState({ isFetching: false });
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      forms: {
        [name]: value,
      }
    });
  }

  render() {
    const { currencies, isFetching } = this.state;
    const { handleChange } = this;

    if (isFetching) {
      return <span>Loading</span>;
    }
    return (
      <forms>
        <label htmlFor="value-input" >
          Valor:
          <input required type="number" data-testid="value-input" name="valor" onChange={ handleChange } />
        </label>
        <label htmlFor="currency-input" >
          Moeda:
          <select required data-testid="currency-input" name="moeda" onChange={ handleChange }>
            {currencies.filter(currency => currency !== "USDT").map((currency, index) => (
              <option key={index} data-testId={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input" >
          Método de Pagamento:
          <select required data-testid="method-input" name="metodo" onChange={ handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
          </select>
        </label>
        <label htmlFor="tag-input" >
          Tag:
          <select required data-testid="tag-input" name="tag" onChange={ handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer ">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input" >
          Detalhes:
          <input data-testid="description-input" name="detalhes" onChange={ handleChange } />
        </label>
        <button type="button">Adicionar Despesa</button>
      </forms>
    );
  }
}

export default Forms;
