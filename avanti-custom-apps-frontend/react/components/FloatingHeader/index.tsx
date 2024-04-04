import React from "react"
import { useRuntime } from 'vtex.render-runtime'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

export const cssHandles = [
  'floatingHeader',
] as const

const FloatingHeader = ({ children }: any) => {
  const { handles: css } = useCssHandles(cssHandles)
  const { route } = useRuntime()
  const classByPage = route?.id === 'store.product' && 'productPage' || route?.id === 'store.home' && 'homePage' || route?.id === 'store.search#department' && 'categoryPage' || route?.id === 'store.search#category' && 'categoryPage' || route?.id === 'store.search#subcategory' && 'categoryPage' || route?.id === 'store.search' && 'categoryPage' || route?.id === 'store.account' && 'accountPage'

  return (
    <div className={applyModifiers(css.floatingHeader, classByPage as string)}>
      {children}
    </div>
  )
}

export default FloatingHeader
