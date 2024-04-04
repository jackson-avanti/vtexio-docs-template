import React, { useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
// import { OrderQueue } from 'vtex.order-manager'
// import { useMutation } from 'react-apollo'
// import UpdateSelectedAddressMutation from 'vtex.checkout-resources/MutationUpdateSelectedAddress'
// import {
//   OrderForm as CheckoutOrderForm,
// } from 'vtex.checkout-graphql'

import { canUseDOM } from 'vtex.render-runtime';
import { cssHandles } from "./handles"
import { useCssHandles } from "vtex.css-handles"
import { UseGlobalContextAvantiRegionalization } from 'drogaleste.global-context'

// const { QueueStatus, useOrderQueue, useQueueStatus } = OrderQueue

const FreeShippingBar = ({ cepTo, zipCodeListContent }: any) => {
  const { handles: css } = useCssHandles(cssHandles)
  const cepFiltrado = Number(cepTo?.replace('-', ''))
  // const [newAdress, setNewAdress] = useState<any>()

  // const [updateSelectedAddress] = useMutation(UpdateSelectedAddressMutation)
  const { orderForm: { totalizers } } = useOrderForm()
  // const { orderForm } = useOrderForm()
  const regionalizationContext = UseGlobalContextAvantiRegionalization()
  // const { enqueue } = useOrderQueue()
  // const queueStatusRef = useQueueStatus()
  // const TASK_CANCELLED = 'TASK_CANCELLED'

  const [totalizersUpdate, setTotalizersUpdate] = useState(0)
  const [valor, setValor] = useState<number>(0)
  const [valorCerto, setValorCerto] = useState(0)
  const [percentage, setPercentage] = useState<number>(1)
  const [meetsCep, setMeetsCep] = useState(false)
  const [existZipCodeList, setExistZipCodeList] = useState(false)

  useEffect(() => {
    totalizers[0] && setTotalizersUpdate(totalizers[0].value / 100)
  }, [])

  useEffect(() => {
    totalizers[0] && setTotalizersUpdate(totalizers[0].value / 100)

    if (canUseDOM && typeof zipCodeListContent === 'object') {
      const zipcodelist = [...zipCodeListContent]
      zipcodelist.map(zipcode => {
        if (cepFiltrado >= parseInt(zipcode.zipCodeInitial) && cepFiltrado <= parseInt(zipcode.zipCodeEnd)) {
          setValor(zipcode.freeShippingValue / 100)
          setExistZipCodeList(true)
        }
      })
    } else {
      setExistZipCodeList(true)
      setValor(750)
    }

  }, [totalizers, cepTo])

  const calculatePercentage = (maxValue: number, actualValue: number) => {
    let totalPercentage: number = 100;

    let partialPercentage: number = Math.round((totalPercentage * actualValue) / maxValue);

    partialPercentage = partialPercentage > 100 ? 100 : partialPercentage

    if (percentage) {
      if (maxValue === 0 || partialPercentage > 100) {
        partialPercentage = 100
      } else {
        partialPercentage = Math.round(partialPercentage)
      }
    }

    setPercentage(partialPercentage)
  }

  useEffect(() => {
    if (valor > 0 && totalizersUpdate > 0) {
      const newValor = valor - totalizersUpdate
      if (newValor < 0) {
        setValorCerto(0)
        calculatePercentage(0, totalizersUpdate)
      } else {
        setValorCerto(newValor)
        calculatePercentage(valor, totalizersUpdate)
      }
    }
  }, [totalizersUpdate, valor])

  useEffect(() => {

    fetch(`/api/checkout/pub/postal-code/BRA/${cepFiltrado}`)
      .then(response => response.json())
      .then((data) => {
        // setNewAdress(data)
        data.city !== '' ?? setMeetsCep(true)
      })
  }, [cepFiltrado])

  // using the mutation to set the adress on orderForm Checkout, then the user don't need to set again
  // const handleSelectAddress = async () => {
  //   await fetch(`/api/checkout/pub/orderForm/${orderForm.id}/attachments/shippingData`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       "logisticsInfo": [
  //         {
  //           "addressId": new Date().getTime(),
  //           "itemIndex": 0,
  //           "selectedDeliveryChannel": "delivery",
  //           "selectedSla": "Entrega padrão"
  //         }
  //       ],
  //       "clearAddressIfPostalCodeNotFound": false,
  //       "selectedAddresses": [
  //         {
  //           "addressId": new Date().getTime(),
  //           ...newAdress
  //         }
  //       ]
  //     })
  //   }).then((res: any) => { return res.json() }).then((res: any) => setOrderForm(res));
  // }

  // useEffect(() => {
  //   if (newAdress != undefined) {
  //     handleSelectAddress()
  //   }
  // }, [newAdress])

  //end mutation use

  if (!meetsCep && existZipCodeList && valor === 0) {
    return <span className={css.erroCepLabel}>Não atendemos a essa região!</span>
  }

  if (!existZipCodeList) return <></>

  if (regionalizationContext?.deliveryChannel !== 'delivery') return <></>
  return (
    <div className={css.formContainer}>
      <div className={css.freeShippingContainer}>
        <div className={css.freeShippingLabel}>
          <span className={css.freeShippingBarContainer}>
            <span className={css.freeShippingBarLine} style={{ width: `${percentage}%` }}>
              <svg className={css.freeShippingBarIcon} width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6345 16.0002C19.2358 16.0019 18.8407 15.9267 18.472 15.779C18.1033 15.6313 17.7683 15.414 17.4864 15.1397C17.2045 14.8653 16.9812 14.5393 16.8294 14.1805C16.6777 13.8217 16.6004 13.4372 16.6022 13.0492H8.95416C8.93358 13.8183 8.60518 14.5491 8.03895 15.086C7.47272 15.6229 6.71344 15.9234 5.92289 15.9234C5.13235 15.9234 4.37305 15.6229 3.80682 15.086C3.24059 14.5491 2.91219 13.8183 2.89162 13.0492H0.465582V1.63617C0.463384 1.42034 0.505447 1.20624 0.589306 1.00642C0.673164 0.806604 0.797128 0.625079 0.953956 0.472456C1.11078 0.319833 1.29732 0.199177 1.50265 0.117567C1.70797 0.0359571 1.92795 -0.00497824 2.14973 -0.00283982H16.9731C17.195 -0.00511214 17.4151 0.0357271 17.6205 0.117277C17.826 0.198828 18.0126 0.319453 18.1696 0.47209C18.3265 0.624727 18.4506 0.806308 18.5345 1.00619C18.6184 1.20608 18.6605 1.42025 18.6583 1.63617V2.06216H22.1623C22.6598 2.06061 23.1478 2.19504 23.5707 2.45015C23.9937 2.70526 24.3345 3.07081 24.5544 3.50517L26.3403 6.94816C26.3793 7.04397 26.4022 7.14527 26.4081 7.24817V13.0842H22.6349C22.6374 13.468 22.5615 13.8485 22.4117 14.2037C22.2619 14.5588 22.0411 14.8814 21.7622 15.1528C21.4833 15.4243 21.1518 15.6391 20.7869 15.7849C20.422 15.9307 20.031 16.0046 19.6365 16.0022L19.6345 16.0002ZM23.3779 4.09817C23.2598 3.88401 23.0852 3.70431 22.8721 3.57759C22.659 3.45087 22.415 3.38169 22.1653 3.37717H18.6912V6.55717H24.651L23.3779 4.09817Z" fill="#1A3797" />
              </svg>
            </span>
          </span>

          {percentage < 100 ?
            <span className={css.freteText}>
              Faltam <strong className={css.frete} >R$ {valorCerto > 0 ? valorCerto.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 0}</strong> para ganhar frete grátis
            </span>
            :
            <span className={css.freeShippingLabelWin}>
              Você ganhou <strong> frete grátis</strong>
            </span>
          }
        </div>

        <div className={css.freeShippingBar}>
          <span className={css.freeShippingBarColor} style={{ width: `${percentage}%`, maxWidth: '98%', minWidth: '4%' }}>
          </span>
        </div>
      </div>
    </div>
  )
}

export default FreeShippingBar
