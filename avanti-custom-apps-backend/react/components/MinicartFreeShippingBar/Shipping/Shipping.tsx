import React, { useState, useEffect } from 'react'
import FreeShippingBar from '../FreeShippingBar';
import { OrderForm } from 'vtex.order-manager'

const { useOrderForm } = OrderForm

import { canUseDOM } from 'vtex.render-runtime';
import useFreeShippingBar from '../../../hooks/useFreeShippingBar';


const ShippingMinicart = () => {
  const [cepTo, setCepTo] = useState('')
  const { orderForm } = useOrderForm()
  console.log("🚀 ~ ShippingMinicart ~ orderForm:", { orderForm }, JSON.stringify(orderForm))
  const [existZipCodeList, setExistZipCodeList] = useState(false)
  const zipCodeList = useFreeShippingBar();

  useEffect(() => {
    if (canUseDOM && typeof zipCodeList === 'object') {
      setExistZipCodeList(true)
    } else {
      setExistZipCodeList(false)
    }
  }, [cepTo])

  const getOldCep = () => {
    if (orderForm.shipping.selectedAddress) {
      const oldCep = orderForm.shipping?.selectedAddress?.postalCode
      setCepTo(oldCep)
    }
  }

  useEffect(() => {
    getOldCep()
  }, [])

  if (!existZipCodeList) return <></>

  return (
    <>
      {
        cepTo ?
          <FreeShippingBar zipCodeListContent={zipCodeList} cepTo={cepTo} />
          : null
      }
    </>
  )
}

export default ShippingMinicart
