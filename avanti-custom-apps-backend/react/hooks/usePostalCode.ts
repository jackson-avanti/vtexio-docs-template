import { UseGlobalContextAvantiRegionalization } from 'drogaleste.global-context'

const usePostalCode = () => {
  const regionalizationContext = UseGlobalContextAvantiRegionalization()

  return regionalizationContext?.delivery?.cep || regionalizationContext?.slaSelected?.pickupStoreInfo?.address?.postalCode || null
}

export default usePostalCode
