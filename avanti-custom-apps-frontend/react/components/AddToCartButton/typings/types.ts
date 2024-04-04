export type PropsItens = {
  id: string;
  quantity: number;
  maxQuatity: number;
  maxEstoque: number;
  name: string;
};

export type ItemQuantities = {
  itemsTotalQuantity: number;
  itemsSplitedFirstHalf: number;
  itemsSplitedSecondHalf: number;
};

export type IProperties = {
  name: string;
  values: [string];
};

export type HandleDdebounce = {
  quantityToDispatch: number;
  operation: 'removeFromCart' | 'addToCart' | 'first-item';
};

export type IOrderForm = {
  orderForm: OrderForm;
  setOrderForm: React.Dispatch<React.SetStateAction<OrderForm>>;
};

export type IQuantityStepper = {
  productQuantity: number;
  showUnit: boolean;
  unit: string | undefined;
  availableQuantity?: number;
  setProductQuantity?: any;
  setLoading?: any;
  onChangeStepperQuantity: any;
  loading: boolean;
  handleClickQuantity: (operation: 'removeFromCart' | 'addToCart' | 'first-item', quantityUpdate?: number) => void;
};

export type IQuantityButton = {
  handleClickQuantity: (operation: 'removeFromCart' | 'addToCart' | 'first-item') => void;
  AvailableQuantity?: number;
  loading: boolean;
};
