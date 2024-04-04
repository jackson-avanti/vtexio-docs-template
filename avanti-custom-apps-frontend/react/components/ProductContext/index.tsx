import React from 'react';
//@ts-ignore
import useProduct from 'vtex.product-context/useProduct';

interface ProductContext {
  assemblyOption: object;
  buyButton: BuyButton;
  loadingItem: boolean;
  product: Product;
}
interface BuyButton {
  clicked: boolean;
}

interface Product {
  brand: string;
  brandId: number;
  cacheId: string;
  categories: string[];
  categoryId: string;
  categoryTree: object[];
}

export function ProductContext() {
  const productCtx: ProductContext = useProduct();

  console.log('Contexto de produto', productCtx);
  return (
    <div>
      <h4>{productCtx.product.brand}</h4>
    </div>
  );
}
