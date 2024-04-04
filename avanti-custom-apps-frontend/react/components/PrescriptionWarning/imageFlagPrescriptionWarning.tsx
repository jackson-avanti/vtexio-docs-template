import React from 'react'
import { useProduct } from 'vtex.product-context'

import styles from './styles.css'

const imageFlagPrescriptionWarning = () => {
  const productContextValue = useProduct()
  const properties = productContextValue?.product?.properties

  const recipeNotice = properties?.filter(
    (prop: { name: string }) => prop.name === 'Exige Receita?'
  )?.[0]?.values[0]

  return (
    <>
      {recipeNotice === 'SIM' && (
        <div className={styles.containerImageFlagPrescriptionWarning}>
          <span className={styles.iconImageFlagPrescriptionWarning} />
          <p className={styles.textImageFlagPrescriptionWarning}>
            A CONCLUSÃO DE COMPRA DESSE ITEM ESTÁ SUJEITA A APRESENTAÇÃO,
            AVALIÇÃO E RETENÇÃO DA RECEITA ORIGINAL PELO FARMACEUTICO.
          </p>
        </div>
      )}
    </>
  )
}

export default imageFlagPrescriptionWarning
