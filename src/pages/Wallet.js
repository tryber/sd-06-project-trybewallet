import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return (
      <div>Wallet</div>
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
