import { useOrderForm } from 'vtex.order-manager/OrderForm'

interface IOrderForm {
  orderForm: OrderForm
}

const useOrderFormTotalizersItems = () => {
  const { orderForm }:IOrderForm = useOrderForm()
  const totalItems = orderForm?.totalizers?.find(({ id }) => id?.includes("Items"))
  
  return totalItems?.value
}

export default useOrderFormTotalizersItems