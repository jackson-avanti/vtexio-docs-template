# Rotas REST

⬅️ [Readme](../README.md)

Nesse documento serão detalhadas as Rotas REST existentes neste App, dividas por entidades.

## Entidades

- [Users](#users)

## Users

- **URL**: `/get-users`
- **Method:** GET
- **Example Usage**: `/get-users?email=abc123@email.com`

| Parametros | Tipos   | Exemplo          |
| ---------- | ------- | ---------------- |
| cpf        | integer | 00011122233      |
| email      | string  | abc123@email.com |
| name       | string  | João             |

#### Response

Example response:

```json
{
  [
    {
        "cpf": 00011122233,
        "email": "abc123@email.com",
        "id": 1,
        "name": "João"
    }
  ]
}
```

| Resposta | Tipos   | Exemplo          |
| -------- | ------- | ---------------- |
| active   | boolean | false            |
| cpf      | integer | 00011122233      |
| email    | string  | abc123@email.com |
| id       | number  | 1                |
| name     | string  | João             |

- **URL**: `/create-user`
- **Method:** POST
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

| Parametros | Tipos   | Exemplo          |
| ---------- | ------- | ---------------- |
| active     | boolean | false            |
| cpf        | integer | 00011122233      |
| email      | string  | abc123@email.com |
| name       | string  | João             |

#### Response

Example response:

```json
{
  [
    {
        "active": false,
        "cpf": 00011122233,
        "email": "abc123@email.com",
        "id": 1,
        "name": "João"
    }
  ]
}
```

| Resposta | Tipos   | Exemplo          |
| -------- | ------- | ---------------- |
| active   | boolean | false            |
| cpf      | integer | 00011122233      |
| email    | string  | abc123@email.com |
| id       | number  | 1                |
| name     | string  | João             |
