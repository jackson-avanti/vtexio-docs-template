import React from 'react'
import useProduct from "vtex.product-context/useProduct";
import style from './style.css'
import { cartSimulation } from '../utils/getPromotionPrice';
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { formatCurrency } from '../utils/pricePix';



export default function Pix() {
  const { selectedItem }: ProductContextState = useProduct()
  const [price, setPrice] = React.useState<number>()

  React.useEffect(() => {
    const pixId = '125'
    if (selectedItem) {
      cartSimulation(selectedItem, setPrice, pixId)
    }
  }, [selectedItem])

  const priceFormatted = (price: number | undefined) => {
    if (price === undefined) return
    return `R$ ${(price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const calculateDiscount = (price: number | undefined) => {
    const listPrice = selectedItem?.sellers[0].commertialOffer.ListPrice
    if (price === undefined || listPrice === undefined || price / 100 >= listPrice) return null
    return formatCurrency(listPrice - (price / 100))
  }

  return (
    <div className={style.tabContent + " " + style.containerPix}>
      <div className={style.tabWrapper}>
        <span className={style.textPriceBoleto}>
          {price && priceFormatted(price)} à vista no PIX
        </span>
        {price && calculateDiscount(price) && <span className={style.textDesconto}>(Economize {calculateDiscount(price)})
        </span>}
      </div>
      <div>
        <p>
          Seu pedido liberado na hora! Após finalizar o pagamento pedido de compra, será disponibilizado o código
        </p>
        <ol>
          <li>Acesse seu Internet Banking ou app de pagamento.</li>
          <li>Escolha pagar via PIX.</li>
          <li>Escaneie o QR Code ou copie o código de pagamento.</li>
          <li>Não é preciso enviar comprovante de pagamento.</li>
        </ol>
      </div>
    </div>
  )
}


