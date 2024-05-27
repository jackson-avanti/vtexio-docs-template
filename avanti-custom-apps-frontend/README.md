# VTEX Custom Apps Frontend

Este é o diretório que contém os custom apps exclusivos de frontend. São hooks e componentes de baixa complexidade, com nenhuma ou poucas regras de negócio em que não houve necessidade de criar um app separado. Aqui estão alguns recursos incluídos:

- Componentes customizados (totalmente novos ou forkados da vtex e incrementados conforme a necessidade);
- Hooks;

## Sumário

- [Requisitos e Dependências](#requisitos-e-depend%C3%AAncias)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Instalação](#instala%C3%A7%C3%A3o)
- [Release e deploy](#release-e-deploy)
- [Componentes](componentes)
- [Hooks](hooks)
- [Lojas que já usaram esse App](#lojas-que-j%C3%A1-usaram-esse-app)

## Requisitos e Dependências

Os seguintes itens são obrigatórios para que alguns ou todos os componentes deste app funcionem de forma adequada:

- Chave de API do Google Maps (Api Key) //Exemplo
- Chave de API de app da VTEX (app key e app token) //Exemplo
- Salvar uma nova configuração de OrderForm na seguinte rota `https://{{accountName}}.myvtex.com/api/checkout/pvt/configuration/orderForm`.
  O campo `allowManualPrice` deve ser alterado para `false`. //Exemplo

Este app tem as seguintes peerDependecies:

- `avantivtexio.ourstores@0.x`: Importa o mapa para ser usado na LP da unidade de loja franquia; //Exemplo
- `{accountName}.context-global@0.x`: Consulta dados cadastrados no contexto global via Site Editor; //Exemplo

## Estrutura de pastas

```
|_ assets //Imagens ou outros arquivos que não são código fonte ou de configuração
|_ components //Componentes de Frontend
|_ graphql //Definição das Queries e Mutations usadas pelo Frontend
|_ hooks //Hooks customizados
|_ typings //Definição de tipos do typescript
|_ utils //Funções puras usadas em um ou mais partes do App
```

## Instalação

1. Instale as dependências/peerDependencies do app mencionadas em [Requisitos e Dependências](#requisitos-e-depend%C3%AAncias);
2. Execute na CLI de seu workspace:

```
"vtex install {accountName}.custom-apps-frontend": "0.x"
```

3. Adicione no manifest de sua store-theme:

```
"{accountName}.custom-apps-frontend@0.x
```

4. Instale ou faça o Link de sua store-theme atualizada com o novo manifest incluindo esse app

## Release e deploy

Execute os seguintes comandos na CLI:

```
vtex setup -i //Para remover dependendencias de workspace

git push --set-upstream origin {branchName} //Define um upstream para o release

vtex release {releaseType} stable //Cria a tag da nova versão. O releaseType pode ser "patch", "minor" ou "major"

vtex publish //Faz a publicação da nova versão, a partir daqui poderá rodar vtex install para essa nova versão em workspaces
```

Após isso, deverá instalar essa nova versão em seu workspace, removendo o link e, a partir disso, testar a estabilidade do release.

Se esse candidato a release estiver estável, faça o deploy com o comando `vtex deploy`.

## Componentes

Lista com todos os componentes. A sua leitura é a seguinte:
`{nome do componente React}`: `{bloco para ser usado na store theme}`

O link no nome do componente leva à documentação com detalhes de implementação e uso

- [AddToCartButton](/avanti-custom-apps-frontend/docs/components/addtocartbutton.md): `avanti-add-to-cart-button`
- [CustomFaq](/avanti-custom-apps-frontend/docs/components/customfaq.md): `avanti-faq`
- [RelatedShelf](/avanti-custom-apps-frontend/docs/components/relatedshelf.md): `avanti-related-shelf`

## Hooks

Lista de Hooks custom implementados.

- [useDebounce](/avanti-custom-apps-frontend/docs/hooks/usedebounce.md) - Aguarda um determinado tempo após o usuário terminar de digitar em um input antes de executar a função onChange
- [useFormatCurrency](/avanti-custom-apps-frontend/docs/hooks/useformatcurrency.md) - Disponibiliza um formatador de numeros para moeda

#### Lojas que já usaram esse App:

1. -
2. -

_OBS: Esse app não deve implementar a logica de um diretório node. Caso seja necessária uma query ou mutation simples, sendo uma extensão de uma nativa ou uma totalmente nova, faça em [Avanti Custom Apps Backend](/avanti-custom-apps-backend): Adicione o respectivo App nas peerDependencies deste App e consuma essa requisição em `/graphql`.
Por outro lado, caso seja uma requisição mais complexa, com moderada ou alta quantidade de regras de negócio, conversão de dados ou dependência de muitos apps, considere criar um App exclusivo para essa funcionalidade._
