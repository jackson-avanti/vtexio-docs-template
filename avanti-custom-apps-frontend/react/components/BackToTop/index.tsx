import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import useIsScrollingUp from '../../hooks/useIsScrollingUp'

const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
};

const CSS_HANDLES = ['backToTop'] as const

type Props = {
  blockClass?: string | string[]
}

const BackToTop: React.FC<Props> = ({ children }) => {
  const { withModifiers } = useCssHandles(CSS_HANDLES)

  const scrollingUp = useIsScrollingUp()

  const modifier = scrollingUp ? 'visible' : 'hidden'

  return (
    <button
      className={withModifiers('backToTop', modifier)}
      onClick={scrollingUp ? scrollToTop : undefined}
    >
      {children}
    </button>
  )
}

export default BackToTop
