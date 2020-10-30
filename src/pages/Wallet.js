import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      moedas: [],
    };
  }

  async componentDidMount() {
    const requisicao1 = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requisicao2 = await requisicao1.json();
    this.setState({
      moedas: requisicao2,
    });
  }

  render() {
    const { email } = this.props;
    const arrayMoedas = [];
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <p>
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <form>
          <input type="text" data-testid="value-input" />
          <textarea data-testid="description-input" />
          <select type="text" data-testid="currency-input">
            {arrayMoedas.map((moeda) => (
              <option
                key={ moeda }
                data-testid={ moeda }
              >
                { moeda }
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
