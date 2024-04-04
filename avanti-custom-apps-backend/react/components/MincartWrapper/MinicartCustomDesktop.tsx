import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { FormattedCurrency } from "vtex.format-currency";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { usePixel } from "vtex.pixel-manager";
const cssHandles = [
  "cm-container-minicart-desktop",
  'cm-wrapper-minicart-desktop',
  'cm-wrapper-texts',
  'cm-text-price',
  'cm-text-qty'
]
const MinicarCustomDesktop = ({ children }: any) => {
  const { handles: css } = useCssHandles(cssHandles)
  const [cartInfo, setCartInfo] = React.useState<{ total: number, itensQty: number } | null>(null);
  const { orderForm } = useOrderForm();
  const { push } = usePixel();
  const handleClick = () => {
    push({
      id: 'open-minicart-custom-button',
      event: 'viewCart',
    })
  }

  React.useEffect(() => {
    setCartInfo({
      total: orderForm?.totalizers?.[0]?.value,
      itensQty: orderForm?.items.length ? orderForm.items.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.quantity, 0) : 0
    })
  }, [orderForm?.value])

  return <>
    {cartInfo && cartInfo?.itensQty > 0 ? (
      <div className={css['cm-container-minicart-desktop']}>
        <button className={css['cm-wrapper-minicart-desktop']} onClick={() => handleClick()} >
          <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.8855 26H8.74932C6.34016 26 4.34011 24.2444 3.95382 21.9402L3.94989 21.9116L1.71922 8.44159H29.9292L27.6986 21.9116C27.3084 24.2444 25.3083 26 22.8991 26H22.8848H22.8855ZM8.77232 23.974H22.8928C24.3039 23.974 25.4753 22.9457 25.7014 21.596L25.7037 21.5793L27.5502 10.4676H4.09811L5.94463 21.5793C6.17305 22.9457 7.34442 23.974 8.75552 23.974H8.76339H8.76297L8.77232 23.974ZM31.3242 10.4675H0.324219V8.44156H31.3242V10.4675ZM10.379 12.0478H8.35728V9.24654L12.3077 0L14.1663 0.798223L10.3789 9.66252L10.379 12.0478ZM23.2912 12.0478H21.2694V9.66255L17.4834 0.810418L19.3406 3.03202e-05L23.2912 9.24658V12.0478ZM16.835 21.1106H14.8134V14.6411H16.8351L16.835 21.1106ZM11.6729 21.1106H9.65116V14.6411H11.6729V21.1106ZM21.9973 21.1106H19.9755V14.6411H21.9973V21.1106Z" fill="#1A3797" />
          </svg>
          <div className={css['cm-wrapper-texts']}>
            <FormattedCurrency value={cartInfo?.total ? (cartInfo?.total / 100) : 0} />
            <span className={css['cm-text-qty']}> {cartInfo?.itensQty} itens</span>
          </div>
        </button >
        {children}
      </div>
    ) : <>{children}</>}
  </>
}

export default MinicarCustomDesktop