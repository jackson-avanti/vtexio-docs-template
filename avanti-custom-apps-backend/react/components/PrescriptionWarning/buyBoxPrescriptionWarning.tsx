import React from 'react'
import { useProduct } from 'vtex.product-context'

import styles from './styles.css'

const BuyBoxPrescriptionWarning = () => {
  const productContextValue = useProduct()
  const properties = productContextValue?.product?.properties

  const buyboxRecipeNotice = properties?.filter(
    (prop: { name: string }) => prop.name === 'Exige Receita?'
  )?.[0]?.values[0]

  return (
    <>
      {buyboxRecipeNotice === 'SIM' && (
        <div className={styles.containerbuyBoxPrescriptionWarning}>
          <p className={styles.textbuyBoxPrescriptionWarning}>
            Exige envio e retenção de receita
          </p>
        </div>
      )}
    </>
  )
}

export default BuyBoxPrescriptionWarning
