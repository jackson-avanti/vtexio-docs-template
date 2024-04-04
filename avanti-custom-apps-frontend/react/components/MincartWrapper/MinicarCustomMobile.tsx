import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { FormattedCurrency } from 'vtex.format-currency';
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { usePixel } from 'vtex.pixel-manager'
import { useRuntime } from 'vtex.render-runtime'

const cssHandles = [
  'cm-wrapper-minicart-mobile',
  'cm-button',
  'cm-text',
  'cm-text-price',
  'cm-text-qty'
]
export const MinicarCustomMobile = () => {
  const { handles: css } = useCssHandles(cssHandles)
  const [cartInfo, setCartInfo] = React.useState<{ total: number, itensQty: number }>();
  const { push } = usePixel();
  const { orderForm } = useOrderForm();
  const { history } = useRuntime()

  const handleClick = () => {
    push({
      id: 'open-minicart-custom-button',
      event: 'viewCart',
    })
  }
  const isHome = (history?.location.pathname === '/')


  React.useEffect(() => {
    setCartInfo({
      total: orderForm?.totalizers?.[0]?.value,
      itensQty: orderForm?.items.length ? orderForm.items.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.quantity, 0) : 0
    })
  }, [orderForm?.value])

  return <>
    {cartInfo && isHome && cartInfo.itensQty > 0 ? (
      <div className={css['cm-wrapper-minicart-mobile']}>
        <div>
          <span className={css['cm-text']} >Total sem entrega</span>
          <div>
            <FormattedCurrency value={(cartInfo?.total / 100)} />
            <span className={css['cm-text-qty']}> / {cartInfo?.itensQty} itens</span>
          </div>
        </div>
        <button className={css['cm-button']} onClick={() => handleClick()}>Ver cestinha</button>
      </div>
    ) : null}
  </>

}
