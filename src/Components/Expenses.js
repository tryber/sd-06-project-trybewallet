import React, { Component } from 'react';
import { connect } from 'react-redux';

class Expenses extends Component {
  render() {
    return (
      <form className="despesas">
        <fieldset>
          <div>
            <label htmlFor="expense-value">
              Valor da despesa:
              <input
                name="value"
                data-testid="value-input"
                // value={ value }
                // onChange={ handleInput }
              />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="description">
              descrição da despesa:
              <input
                name="value"
                data-testid="description-input"
                // value={ value }
                // onChange={ handleInput }
              />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="currency">
              Moeda:
              <select
                name="currency"
                data-testid="currency-input"
                // value={ value }
                // onChange={ handleInput }
              >
                {this.handleOptions}
              </select>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="method">
              Forma de Pagamento:
              <select
                name="method"
                data-testid="method-input"
                // value={ value }
                // onChange={ handleInput }
              >
                <option value="dinehiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="tag">
              Tipo:
              <select
                name="tag"
                data-testid="tag-input"
                // value={ value }
                // onChange={ handleInput }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>

              </select>
            </label>
          </div>
        </fieldset>

      </form>

    );
  }
}

export default connect()(Expenses);

/* #### Formulário de adição de Despesa

4. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:

  * Um campo para adicionar valor da despesa.
    * Adicione o atributo `data-testid="value-input"`.

  * Um campo para adicionar a descrição da despesa.
    * Adicione o atributo `data-testid="description-input"`.

  * Um campo para adicionar em qual moeda será registrada a despesa.
    * Adicione o atributo `data-testid="currency-input"`
    * Este campo deve ser um dropdown. a pessoa usuária deve poder escolher entre os campos: 'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH' e 'XRP'.

    * Os valores do campo de moedas devem ser puxados através da requisição à API.
      * Adicione um atributo *data-testid* para cada uma das opções acima com o câmbio correspondente, como por exemplo `data-testid="USD"`.
      * O endpoint utilizado deve ser: https://economia.awesomeapi.com.br/json/all .
      * Remova das informações trazidas pela API a opção 'USDT' (Dólar Turismo).

  * Um campo para adicionar qual método de pagamento será utilizado.
    * Adicione o atributo `data-testid="method-input"`.
    * Este campo deve ser um dropdown. A pessoa usuária deve poder escolher entre os campos: 'Dinheiro', 'Cartão de crédito' e 'Cartão de débito'.

  * Um campo para selecionar uma categoria (tag) para a despesa.
    * Este campo deve ser um dropdown. a pessoa usuária deve poder escolher entre os campos: 'Alimentação', 'Lazer', 'Trabalho', 'Transporte' e 'Saúde'.
    * Adicione o atributo `data-testid="tag-input"`.
    * Ao ser clicado, o botão deve fazer uma requisição à API para trazer o câmbio mais atualizado possível.

  * Um botão com o texto \'Adicionar despesa\' que salva as informações da despesa no estado global e atualiza a soma de despesas no header.
    * Desenvolva a funcionalidade do botão "Adicionar despesa" de modo que ao clicar no botão, as seguintes ações sejam executadas:
    * Os valores dos campos devem ser salvos no estado da aplicação, na chave ***expenses***, dentro de um array contendo todos gastos que serão adicionados:

      * O `id` da despesa **deve** ser um número sequencial, começando em 0. Ou seja: a primeira despesa terá id 0, a segunda terá id 1, a terceira id 2, e assim por diante.

      * Você deverá salvar a cotação do câmbio feita no momento da adição para ter esse dado quando for efetuar uma edição do gasto. Caso você não tenha essa informação salva, o valor da cotação trazida poderá ser diferente do obtido anteriormente.

    Atenção nesse ponto: você deverá fazer uma requisição para API e buscar a cotação no momento que o botão de `Adicionar despesa` for apertado. Para isso você deve utilizar um thunk

    * Após adicionar a despesa, atualize a soma total das despesas. Essa informação deve ficar no header dentro do elemento com `data-testid="total-field"` */
