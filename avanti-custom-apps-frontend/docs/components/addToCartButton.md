# AddToCartButton

⬅️ [Readme](../../README.md)

#### O que é e para que é usado

É um botão customizado que estende a funcionalidade do botão de `adicionar ao carrinho` padrão da VTEX.

#### Uso

```json
//Component
<AddToCartButton disabled={disabled} available={available} skuId={skuId}>
    Comprar
</AddToCartButton>
```

```json
// /store-theme/product.jsonc
"store.product": {
    "children": [
      "avanti-add-to-cart-button"
    ]
  }
```

#### Parâmetros

| Parametros | Tipos   | Exemplo |
| ---------- | ------- | ------- |
| disabled   | boolean | false   |
| available  | boolean | false   |
| skuId      | string  | "1"     |
