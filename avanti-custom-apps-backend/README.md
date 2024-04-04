# VTEX Custom Apps Backend

Nesta pasta estão os custom apps exclusivos de backend. Alguns recursos aqui são:

- Listeners de eventos da plataforma;
- Rotas REST;
- Queries e mutations Graphql;

### Instalação

Execute na CLI:

```
"{accountName}.custom-apps": "0.x"
```

### Rotas REST

Estas são rotas expostas por este app. Podem chamadas por Apps frontend ou outros Apps backend.

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

### Queries GraphQL

### Mutations GraphQL

Clone o custom apps e cole no repositório da loja, não esqueça de chama-lo no manifest da store-theme
