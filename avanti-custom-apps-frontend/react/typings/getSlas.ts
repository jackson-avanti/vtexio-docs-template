export type LogisticInfos = LogisticInfo[]

export interface LogisticInfo {
  itemIndex: number
  selectedSla: string
  selectedDeliveryChannel: string
  addressId: string
  slas: Sla[]
  shipsTo: string[]
  itemId: string
  deliveryChannels: DeliveryChannel[]
}

export interface Sla {
  id: string
  deliveryChannel: string
  name: string
  deliveryIds: DeliveryId[]
  shippingEstimate: string
  shippingEstimateDate: any
  lockTTL: any
  availableDeliveryWindows: AvailableDeliveryWindow[]
  deliveryWindow: any
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: PickupStoreInfo
  pickupPointId?: string
  pickupDistance?: number
  polygonName: string
  transitTime: string
}

export interface DeliveryId {
  courierId: string
  warehouseId: string
  dockId: string
  courierName: string
  quantity: number
  kitItemDetails: any[]
}

export interface AvailableDeliveryWindow {
  startDateUtc: string
  endDateUtc: string
  price: number
  lisPrice: number
  tax: number
}

export interface PickupStoreInfo {
  isPickupStore: boolean
  friendlyName?: string
  address?: Address
  additionalInfo?: string
  dockId: any
}

export interface Address {
  addressType: string
  receiverName: any
  addressId: string
  isDisposable: boolean
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: any
  reference: any
  geoCoordinates: number[]
}

export interface DeliveryChannel {
  id: string
}
