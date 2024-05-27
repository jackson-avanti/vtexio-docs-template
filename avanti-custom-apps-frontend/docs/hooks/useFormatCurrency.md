# useFormatCurrency

⬅️ [Readme](../../README.md)

#### O que é e para que é usado

Disponibiliza um formatador de numeros para moeda.

#### Uso

```json
//MyComponent.tsx

const checkDistance = () => {
    ...code
}
const formatCurrency = useFormatCurrency()

//Convert number to price here
const formattedBundlePrice = formatCurrency(bundlePrice)
```

O formatador retornará sempre uma `string`
