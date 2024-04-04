import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'

import { useCssHandles } from 'vtex.css-handles'

export const cssHandles = [
  'containerSkuVariable',
  'titleSkuVariable',
  'containerListSku',
  'emptyQuantity',
  'haveQuantity',
  'containerItemSku',
  'textSkuVariable'
] as const

interface SimilarProductProps {
  link: string;
  skuSpecifications: {
    values: {
      name: string
      id: string
    }[]
  }[]
  items: {
    sellers: {
      commertialOffer: {
        AvailableQuantity: number
      }
    }[]
  }[]
}

export function SkuVariationPerSimilarProduct() {
  const { handles: css } = useCssHandles(cssHandles)
  const productContextValue: Partial<ProductContextState> | undefined = useProduct()

  const [similarProduct, setSimilarProduct] = useState<SimilarProductProps[]>()

  const id = productContextValue?.product?.productId

  async function getSimilarProducts() {
    const data = await fetch(`/api/catalog_system/pub/products/crossselling/similars/${id}`)
    const response: SimilarProductProps[] = await data.json()
    setSimilarProduct(response)
  }

  useEffect(() => {
    getSimilarProducts()
  }, [productContextValue?.loadingItem])

  if (similarProduct) {
    if (similarProduct.length < 2) {
      return null
    }
  }

  return (
    <div className={css.containerSkuVariable}>
      <h3 className={css.titleSkuVariable}>Tamanho:</h3>
      <ul className={css.containerListSku}>
        {
          similarProduct?.map((item, index) => (
            <>
              {item?.skuSpecifications ? (
                <li key={index} className={css.containerItemSku}>
                  {
                    item?.skuSpecifications?.map((skuItem) => {
                      let isQuantity
                      item.items.map(quantity => quantity.sellers.map(seller => seller.commertialOffer.AvailableQuantity > 0 ? (isQuantity = true) : (isQuantity = false)))

                      return (
                        <a href={isQuantity ? item.link : '#'} className={isQuantity ? css.haveQuantity : css.emptyQuantity}>
                          <span key={index + 10} className={css.textSkuVariable}>
                            {skuItem.values?.map((skuName) => (skuName.name))}
                          </span>
                        </a>)
                    })
                  }
                </li>

              ) : null}

            </>

          ))
        }
      </ul>
    </div>
  )
}
