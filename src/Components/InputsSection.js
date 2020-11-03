import React from 'react';
import { connect } from 'react-redux';
import { expensesData } from '../actions';
import fetchApi from '../services/api';

class InputsSection extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }
  }


  handleChange ({ target }) {
    this.setState({ [target.name]: target.value })
  }

  handleClick = async () => {
    const api = await fetchApi();
    const expenses = {...this.state, exchangeRates: api};
    this.props.sendFunc(expenses)
    this.setState((prevState) => ({
      id: prevState.id + 1
  }));
  }

    render() {
      const { currencies, tags, sendFunc } = this.props;
      const { value, currency, method, tag, description } = this.state;

      return (
        <section className="input-section">
            <div className="value">
              Valor:
              <input name="value" value={value} type="number" defaultValue="0" data-testid="value-input" onChange={this.handleChange} />
            </div>
            <div className="currency">
              Moeda:
              <select name="currency" value={currency} data-testid="currency-input" onChange={this.handleChange}>
                {currencies.map((cur) => (
                  <option
                    key={ cur }
                    data-testid={ cur }
                    value={ cur }
                  >
                    { cur }
                  </option>
                ))}
              </select>
            </div>
            <div className="payment">
              Método de pagamento:
              <select value={method} name="method" data-testid="method-input" onChange={this.handleChange}>
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </div>
            <div className="tag">
              Tag:
              <select name="tag" value={tag} data-testid="tag-input" onChange={this.handleChange}>
                { tags.map((tag) => <option key={ tag } value={ tag }>{ tag }</option>) }
              </select>
            </div>
            <div className="description">
              Descrição:
              <input
                type="text"
                data-testid="description-input"
                placeholder="Digite a descrição"
                name="description"
                value={description}
                onChange={this.handleChange}
              />
            </div>
            <button onClick={this.handleClick} type="button">Adicionar despesa</button>
          </section>
      )
    }
}

const mapDispatchToPops = (dispatch) => {
  return {
    sendFunc: (data) => {
      dispatch(expensesData(data))
    }
  }
}

export default connect(null, mapDispatchToPops)(InputsSection);
