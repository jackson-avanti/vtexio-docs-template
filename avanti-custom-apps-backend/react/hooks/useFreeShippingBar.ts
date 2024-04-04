import React from 'react'
import { FreeShippingBarContext } from 'drogaleste.global-context'

export interface ZipCode {
  zipCodeEnd: string
  zipCodeInitial: string
  freeShippingValue: number
  __editorItemTitle: string
}

type ZipCodeList = ZipCode[]

const useFreeShippingBar = () => React.useContext(FreeShippingBarContext) as ZipCodeList

export default useFreeShippingBar