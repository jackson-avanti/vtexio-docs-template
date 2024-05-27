# useDebounce

⬅️ [Readme](../README.md)

#### O que é e para que é usado

Aguarda um determinado tempo após o usuário terminar de digitar em um input antes de executar a função onChange. Evita multiplas requisições com dados inválidos durante a digitação.

#### Uso

```json
//MyComponent.tsx

const checkDistance = () => {
    ...code
}

const debouncedCheckDistance = useDebounce(checkDistance, 0)

//call debounced function here
debouncedCheckDistance(distance)
```
