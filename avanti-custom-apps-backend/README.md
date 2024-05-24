# VTEX Custom Apps Backend

Este é o diretório que contém os custom apps exclusivos de backend. São lógicas de backend de baixa complexidade, com nenhuma ou poucas regras de negócio em que não houve necessidade de criar um app separado. Aqui estão alguns recursos incluídos:

- Listeners de eventos da plataforma;
- Rotas REST;
- Queries e mutations Graphql;

## Sumário

- [Requisitos e Dependências](#requisitos-e-depend%C3%AAncias)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Instalação](#instala%C3%A7%C3%A3o)
- [Release e deploy](#release-e-deploy)
- [Rotas REST](#rotas-rest)
- [Queries GraphQL](#queries-graphql)
- [Mutations GraphQL](#mutations-graphql)
- [Lojas que já usaram esse App](#Llojas%20que%20j%C3%A1%20usaram%20esse%20app)

## Requisitos e Dependências

Os seguintes itens são obrigatórios para que algumas ou todas as rotas deste app funcionem de forma adequada:

- Chave de API do Google Maps (Api Key) //Exemplo
- Chave de API de app da VTEX (app key e app token) //Exemplo
- Salvar uma nova configuração de OrderForm na seguinte rota `https://{{accountName}}.myvtex.com/api/checkout/pvt/configuration/orderForm`.
  O campo `allowManualPrice` deve ser alterado para `false`. //Exemplo

Este app tem as seguintes peerDependecies:

- `avantivtexio.ourstores@0.x`: Faz busca em lojas cadastradas pelo app de Nossas lojas; //Exemplo
- `{accountName}.context-global@0.x`: Consulta dados cadastrados no contexto global via Site Editor; //Exemplo

## Estrutura de pastas

```
|_ clients //Clients que executam as chamadas externas ou para as APIs VTEX
|_ events //Lógica dos Eventos da Infra VTEX ouvidos pelo App.
|_ resolvers //Lógica das Queries e Mutations GraphQL
|_ routes //Lógica das Rotas Rest que o App oferece
|_ typings //Definição de tipos do typescript
|_ utils //Funções puras usadas em um ou mais partes do App
index.ts //Arquivo principal com a definição de todos os serviços do App
service.json //Configurações de Infra do App e mapeamento de eventos e rotas
```

## Instalação

1. Instale as dependências/peerDependencies do app mencionadas em [Requisitos e Dependências](#requisitos-e-depend%C3%AAncias);
2. Execute na CLI de seu workspace:

```
"vtex install {accountName}.custom-apps-backend": "0.x"
```

3. Adicione no manifest de sua store-theme:

```
"{accountName}.custom-apps-backend@0.x
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

## Rotas REST

Estas são rotas expostas por este app. Podem ser chamadas por Apps frontend ou outros Apps backend. Estão em order alfabética, com a URL e exemplo de uso.

_Para uma visão detalhada das requisições veja:_ [Rotas REST](/docs/rest)

#### GET

- **URL**: `/get-sku`
- **Example Usage**: `/get-sku?sku=15&quantity=2`
  <br>
- **URL**: `/get-users`
- **Example Usage**: `/get-users?email=abc123@email.com`

#### POST

- **URL**: `/create-product`
- **Example Usage**:

```
/create-product body
{
 active: false,
 id: 15,
 name: "name"
}
```

  <br/>

- **URL**: `/create-user`
- **Example Usage**:

```
/create-user body
{
 active: false,
 cpf: 00011122233,
 email: "abc123@email.com",
 name: "name"
}
```

## Queries GraphQL

Este aplicativo expõe Queries GraphQL, [Veja mais detalhes aqui](/avanti-custom-apps-backend/docs/graphql/).
Abaixo estão listadas as queries:

GetSku(sku: $Int, quantity: Int): SKU
GetUsers(email: $String): Users

## Mutations GraphQL

Este aplicativo expõe Mutations GraphQL, [Veja mais detalhes aqui](/avanti-custom-apps-backend/docs/graphql/).

createProduct(product: $ProductInput): Product
createUser(user: $UserInput): User

#### Lojas que já usaram esse App:

1. -
2. -

Clone o custom apps e cole no repositório da loja, não esqueça de chama-lo no manifest da store-theme
