import type { ItemQuantities, PropsItens, IProperties } from '../typings/types';

export function retrieveItemQuantities(orderForm: any, productId: string): ItemQuantities {
  const itemsInOrderForm = orderForm.filter((item: PropsItens) => item.id === productId);
  const itemsSplitedFirstHalf = Number(itemsInOrderForm?.[0]?.quantity) || 0;
  const itemsSplitedSecondHalf = Number(itemsInOrderForm[1]?.quantity) || 0;
  const itemsTotalQuantity = itemsSplitedFirstHalf + itemsSplitedSecondHalf;
  return {
    itemsTotalQuantity,
    itemsSplitedFirstHalf,
    itemsSplitedSecondHalf,
  };
}

export const operationQuantityItemOnMinicart = (
  operation: 'removeFromCart' | 'addToCart' | 'first-item',
  productQuantity: number,
  productName: string,
  toastTime: number,
  showToast: ({ duration, message }: { message: string; duration: number }) => void
) => {
  let operationValue = 0;

  if (operation === 'removeFromCart') {
    operationValue = productQuantity - 1;

    showToast({
      message: `Produto ${productName} removido do carrinho.`,
      duration: toastTime,
    });
  }

  if (operation === 'addToCart') {
    operationValue = productQuantity + 1;

    showToast({
      message: `Produto ${productName} atualizado no carrinho.`,
      duration: toastTime,
    });
  }

  return operationValue;
};

export const parseMeasurementUnit = (unit: string) => {
  unit = unit.toLowerCase();

  if (unit === 'm2') return 'm²';

  return unit;
};

export const existUnit = (productContext: any) => {
  const productProperties = productContext.product.properties;
  const showUnit = typeof productProperties != 'undefined' && productProperties.filter((item: IProperties) => item.name === 'Mostrar unidade de medida');
  if (showUnit.length) return true;
  else return false;
};

export const unitFormated = (productContext: any, productQuantity: number) => {
  let unit = parseMeasurementUnit(productContext?.selectedItem?.measurementUnit);
  const plural = 's';
  if (productQuantity > 1 && unit === 'SACO') {
    unit = unit + plural;
  }
  let unitValue;
  unit !== 'un' && unit !== 'PC' ? (unitValue = unit) : (unitValue = '');
  return unitValue;
};

export const numberMask = (value: number, productContext: any) => {
  const multiplier = productContext?.selectedItem?.unitMultiplier;
  return multiplier !== 1 && existUnit(productContext) ? String((value * multiplier).toFixed(2)).replace('.', ',') : String(value).replace(/\D/g, '');
};

export const multiplyCorrection = (unid: number, productContext: any) => {
  const multiplier = productContext?.selectedItem?.unitMultiplier;
  const unit = productContext?.selectedItem?.measurementUnit;
  if (unit === 'M2' && multiplier) {
    let resultOfReset = Number(unid / multiplier);
    return Math.ceil(resultOfReset);
  } else return unid;
};
