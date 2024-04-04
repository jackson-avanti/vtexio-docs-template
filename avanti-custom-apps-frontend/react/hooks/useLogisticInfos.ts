import React from 'react'

import axios from 'axios'
import { LogisticInfos } from '../typings/getSlas'
import usePostalCode from './usePostalCode'
import useOrderFormTotalizersItems from './useOrderFormTotalizersItems'

const useLogisticInfos = () => {
  const postalcode = usePostalCode()
  const totalItems = useOrderFormTotalizersItems()
  const [logisticInfo, setLogisticInfo] = React.useState<LogisticInfos>([])
  const [loading, setLoading] = React.useState(true)

  const fetchSlas =  async () => {

    if(logisticInfo.length) {
      setLoading(false);
      return
    }

    try{
      setLoading(true)
      const orderForm =  await axios.get('/api/checkout/pub/orderForm')
      const logisticInfo:LogisticInfos = orderForm?.data?.shippingData?.logisticsInfo
      
      setLogisticInfo(logisticInfo ?? [])
    }
    catch(err){
      console.error("Error a get orderForm",err)
    }
    finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchSlas()
  }, [postalcode, totalItems])

  return { logisticInfo, loading }
}

export default useLogisticInfos