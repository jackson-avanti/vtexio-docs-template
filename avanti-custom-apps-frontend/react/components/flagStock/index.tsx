import React from 'react'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'

import style from './style.css'
import { getDefaultSeller } from './getSeller'


export function CriticalStock() {
  const productContextValue: Partial<ProductContextState> | undefined = useProduct()

  const verificarEstoqueProd = getDefaultSeller(
    productContextValue?.selectedItem?.sellers
  )?.commertialOffer?.AvailableQuantity

  if (
    verificarEstoqueProd &&
    verificarEstoqueProd > 0 &&
    verificarEstoqueProd <= 5
  ) {
    // TODO VERIFICAR QUANTIDADE MÍNIMA DE ESTOQUE
    return (
      <div className={style.container}>
        <div className={style.containerFlag}>
          <span className={style.classTextFlag}>
            {Number(verificarEstoqueProd) > 2 ? `Restam apenas ${verificarEstoqueProd} unidades` : `Resta apenas ${verificarEstoqueProd} unidade`}
          </span>
        </div>

      </div>
    )
  }

  if (verificarEstoqueProd === 0) {
    return (
      <div className={style.container}>
        <div className={style.containerFlag}>
          <span className={style.classIconFlag}>
          </span>
          <span style={{ color: '#C3CEC9' }} className={style.classTextFlag}>
            Fora de Estoque
          </span>
        </div>
      </div>
    )
  }

  return null
}
