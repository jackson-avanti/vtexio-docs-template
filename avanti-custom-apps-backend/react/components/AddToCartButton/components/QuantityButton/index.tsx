import React from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from "vtex.css-handles"
import { cssHandles } from "../../handles"
import { IQuantityButton } from '../../typings/types'

export const QuantityButton = ({
  handleClickQuantity,
  AvailableQuantity,
  loading,
}: IQuantityButton) => {
  const { handles: css } = useCssHandles(cssHandles)
  return (
    <>
      <button
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          handleClickQuantity('first-item')
        }}
        disabled={!AvailableQuantity || loading}
        className={css['adtc-button-add-to-cart']}
      >
        {loading ? <Spinner color="#fff" size={20} />
          : <p className={css['adtc-button-text-add']}>{!AvailableQuantity ? "Indisponível" : "Comprar"}</p>
        }
      </button>
    </>
  )
}
