import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Expenses from '../Components/Expenses';

class Wallet extends Component {
  render() {
    return (
      <header>
        <Header />
        <br />
        <Expenses />
      </header>

    );
  }
}

export default connect()(Wallet);

/* ### Página da Carteira

Crie uma página para gerenciar a carteira de gastos em diversas moedas, e que traga a despesa total em uma moeda só. Esta página deve ser renderizada por um componente chamado ***Wallet***.

  ![image](carteira.gif)

#### Configurando sua página

2. Crie uma página para sua carteira com as seguintes características:

  * A rota para esta página deve ser `/carteira`

  * O componente deve se chamar Wallet e estar localizado na pasta `src/pages` no arquivo `Wallet.js`
 */
/* [PÁGINA DA CARTEIRA] Crie um header para a página de carteira contendo as seguintes características:
    ✕ Um elemento que exiba o email do usuário que fez login. (9ms)
    ✕ Crie um campo com a despesa total gerada pela lista de gastos. (3ms)
    ✕ Crie um campo que mostre que qual câmbio está sendo utilizado, que será neste caso 'BRL' (2ms) */
