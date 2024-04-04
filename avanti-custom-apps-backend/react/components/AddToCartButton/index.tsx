import React, { useContext, useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { ToastContext } from 'vtex.styleguide'
import type { ToastContextType } from 'vtex.styleguide'
import { usePixel } from 'vtex.pixel-manager'
import { mapCartItemToPixel } from './pixelHelper'
import { QuantityStepper } from './components/QuantityStepper'
import { QuantityButton } from './components/QuantityButton'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import useProduct from "vtex.product-context/useProduct";
import useMarketingSessionParams from './hooks/useMarketingSessionParams'
import { useProductDispatch } from 'vtex.product-context'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { cssHandles } from './handles/index'
import { operationQuantityItemOnMinicart } from './utils/utils'

interface IAddToCart {
  showUnit: boolean;
  onPDP?: boolean
}

interface IOrderForm {
  orderForm: OrderForm
  setOrderForm: React.Dispatch<React.SetStateAction<OrderForm>>
}

const TOAST_TIMER = 2000;

export function AddToCartButton({ showUnit, onPDP }: IAddToCart) {
  const [productQuantity, setProductQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [onCart, setOnCart] = useState(false)
  const { updateQuantity, addItems } = useOrderItems()
  const { showToast } = useContext<ToastContextType>(ToastContext)
  const { push } = usePixel()
  const { orderForm: { items } }: IOrderForm = useOrderForm()
  const { utmParams, utmiParams } = useMarketingSessionParams();
  const productContextDispatch = useProductDispatch()
  const ctx: ProductContextState = useProduct()
  const { selectedItem } = ctx
  const { itemId, sellerId, availableQuantity, productName, unit } = {
    itemId: selectedItem?.itemId,
    sellerId: selectedItem?.sellers[0]?.sellerId,
    availableQuantity: selectedItem?.sellers[0]?.commertialOffer.AvailableQuantity,
    productName: selectedItem?.name,
    unit: selectedItem?.measurementUnit
  }
  const hasSkuSelected = ctx?.skuSelector.areAllVariationsSelected
  const { handles: css } = useCssHandles(cssHandles)

  const openMinicartDrawer = (newItems: OrderFormItem[]) => {
    const pixelEventItems = newItems?.map(mapCartItemToPixel)
    push({
      id: 'add-to-cart-button',
      event: 'addToCart',
      items: pixelEventItems,
    })
  }

  const onChangeStepperQuantity = (qty: number) => {
    productContextDispatch?.({ type: 'SET_QUANTITY', args: { quantity: qty } })
  }

  const handleClickQuantity = async (
    operation: 'removeFromCart' | 'addToCart' | 'first-item',
    quantityUpdate?: number
  ): Promise<any> => {
    if (!availableQuantity || !productName) return

    if (operation === 'first-item') {
      window.localStorage.setItem('firstProduct', String(itemId))
    }

    productContextDispatch?.({
      type: 'SET_BUY_BUTTON_CLICKED',
      args: {
        clicked: true,
      },
    })

    if (!hasSkuSelected) {
      return showToast({
        message: `Selecione uma variação do produto.`,
        duration: TOAST_TIMER,
      })
    }

    setLoading(true)

    if (operation === 'first-item' && !!availableQuantity) {
      const skuItem = [
        {
          id: String(itemId),
          quantity: 1,
          seller: String(sellerId),
        },
      ]
      await addItems(skuItem, {
        marketingData: { ...utmParams, ...utmiParams },
      } as any)

      openMinicartDrawer(items)

      showToast({
        message: `Produto ${productName} adicionado ao carrinho.`,
        duration: TOAST_TIMER,
      })
      setLoading(false)
      return
    }

    if (
      (operation === 'addToCart' && productQuantity + 1 > availableQuantity) ||
      !availableQuantity
    ) {
      showToast({
        message: `Quantidade máxima atingida.`,
        duration: TOAST_TIMER,
      })
      setLoading(false)
      return
    }

    if (
      (operation === 'removeFromCart' && productQuantity - 1 < 0) ||
      !availableQuantity
    ) {
      setLoading(false)
      return
    }

    const operationValue = operationQuantityItemOnMinicart(
      operation,
      productQuantity,
      productName,
      TOAST_TIMER,
      showToast
    )

    await updateQuantity(
      {
        seller: String(sellerId),
        quantity: quantityUpdate || operationValue,
        id: String(itemId),
      },
      { marketingData: { ...utmParams, ...utmiParams } } as any
    )

    setLoading(false)
  }

  useEffect(() => {
    const [quantityOnCart] = items.filter((item) => item.id === itemId).map((item) => item.quantity)
    onChangeStepperQuantity(quantityOnCart | 0);

    if (quantityOnCart >= 1) {
      setOnCart(true)
    } else {
      setOnCart(false)
    }

    setProductQuantity(quantityOnCart | 0)
  }, [itemId, items])

  return (
    <div
      className={applyModifiers(css['adtc-button-wrapper'], [
        onPDP ? 'on-pdp' : '',
      ])}
    >
      {productQuantity >= 1 ? (
        <QuantityStepper
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
          unit={unit}
          showUnit={showUnit}
          availableQuantity={availableQuantity}
          handleClickQuantity={handleClickQuantity}
          onChangeStepperQuantity={onChangeStepperQuantity}
          setLoading={setLoading}
          loading={loading}
        />
      ) : (
        <QuantityButton
          AvailableQuantity={availableQuantity}
          handleClickQuantity={handleClickQuantity}
          loading={loading}
        />
      )}
      {onCart && (
        <span className={css['adtc-sucess-message']}>Produto adicionado</span>
      )}
    </div>
  )
}
