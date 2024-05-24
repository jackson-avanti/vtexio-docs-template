# GraphQL API

⬅️ [Readme](../README.md)

## Visão geral

Estas são as **_Mutations_** e **_Queries_** disponíveis para este aplicativo.

Neste documento você encontrará uma visão geral e exemplos de consultas e mutações. Para encontrar mais detalhes de cada Query, Mutation, Filters e Fields, verifique a documentação gerada automaticamente através da IDE GraphiQL no painel administrativo da VTEX.

## Queries

### GetUsers

Esta consulta retorna uma lista de Usuários

```graphql
query GetUsers {
  getUsers(email: "abc123@email.com") {
    cpf
    email
    id
    name
  }
}
```

## Mutations

### CreateUser

Cria um novo registro de usuário

```graphql
mutation CreateUser {
  createUser(active: false, cpf: 00011122233, email: "abc@123.com", name: "name") {
    active
    cpf
    email
    id
    name
  }
}
```
