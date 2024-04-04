import React, { useState, useRef, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { applyModifiers, useCssHandles } from "vtex.css-handles"
import { cssHandles } from "../../handles"
import { IOrderForm, HandleDdebounce, IQuantityStepper } from '../../typings/types'
import { existUnit, unitFormated, numberMask, multiplyCorrection } from '../../utils/utils'
import { Spinner } from 'vtex.styleguide'

export const QuantityStepper = ({
  productQuantity,
  setProductQuantity,
  unit,
  showUnit,
  availableQuantity,
  handleClickQuantity,
  loading,
  setLoading,
  onChangeStepperQuantity
}: IQuantityStepper) => {
  const productContextValue = useProduct()
  const [inputValue, setInputValue] = useState(productQuantity)
  const { handles: css } = useCssHandles(cssHandles)
  const timeoutDebounce = useRef<any>()
  let quantityToAdd = productQuantity
  const {
    orderForm: { items },
  }: IOrderForm = useOrderForm()

  const handleDebounce = ({ quantityToDispatch, operation }: HandleDdebounce): void => {
    onChangeStepperQuantity(quantityToDispatch);
    const timeoutDispatch = 1000
    clearTimeout(timeoutDebounce.current)
    timeoutDebounce.current = setTimeout((): void => {
      setLoading(true)
      setProductQuantity(quantityToDispatch)
      handleClickQuantity(operation)
    }, timeoutDispatch);
  }

  const handleDebounceInput = ({ quantityToDispatch, operation }: HandleDdebounce): void => {
    onChangeStepperQuantity(quantityToDispatch);
    const timeoutDispatch = 1000
    let resultQuatity = multiplyCorrection(Number(quantityToDispatch), productContextValue)
    clearTimeout(timeoutDebounce.current)
    timeoutDebounce.current = setTimeout((): void => {
      setLoading(true)
      setProductQuantity(resultQuatity)
      handleClickQuantity(operation, resultQuatity)
    }, timeoutDispatch);
  }

  useEffect(() => {
    let inputValueToNumber = numberMask(productQuantity, productContextValue).replace(",", ".")
    setInputValue(Number(inputValueToNumber))
  }, [items, productQuantity])

  return (
    <div
      className={css['adtc-container-stepper']}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <button
        type="button"
        className={css['adtc-button-decrement']}
        aria-label="Remover um"
        disabled={loading}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setProductQuantity(quantityToAdd - 1)
          handleDebounce({ quantityToDispatch: quantityToAdd - 1, operation: 'removeFromCart' })
        }}
      >
        -
      </button>

      <span className={applyModifiers(css['adtc-button-quantity'], [unit ?? `${unit}`])}>
        {loading ?
          <Spinner color="#002A47" size={20} />
          :
          <input
            className={css['adtc-quantityInput']}
            disabled={loading}
            name="number"
            type="number"
            onFocus={e => e.target.value = ""}
            onChange={e => {
              e.preventDefault()
              e.stopPropagation()
              if (e.target.value !== '') {
                const newQuantity = Number(e.target.value)
                const newOperation = newQuantity > productQuantity ? 'addToCart' : 'removeFromCart'
                setInputValue(newQuantity)
                handleDebounceInput({ operation: newOperation, quantityToDispatch: newQuantity })
              }
            }}
            value={inputValue}
          />
        }
        {showUnit && unit && existUnit(productContextValue) &&
          <span className={css['adtc-span-unit']}>
            {unitFormated(productContextValue, productQuantity)}
          </span>}
      </span>

      <button
        type="button"
        className={css['adtc-button-increment']}
        aria-label="Adicionar mais um"
        disabled={typeof availableQuantity != 'undefined' && availableQuantity <= productQuantity || loading}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setProductQuantity(quantityToAdd + 1)
          handleDebounce({ quantityToDispatch: quantityToAdd + 1, operation: 'addToCart' })
        }}
      >
        +
      </button>
    </div>
  )
}
