import React from "react";
import { useCssHandles } from 'vtex.css-handles'

export const cssHandles = [
  'swp-search-icon',
  'swp-close-icon'
] as const

export const SearchIcon = () => {
  const { handles: css } = useCssHandles(cssHandles)

  return (
    <svg className={css['swp-search-icon']} width="25px" height="25px">
      <path d="M15.707 13.293L13 10.586C13.63 9.536 14 8.311 14 7C14 3.14 10.859 0 7 0C3.141 0 0 3.14 0 7C0 10.86 3.141 14 7 14C8.312 14 9.536 13.631 10.586 13L13.293 15.707C13.488 15.902 13.744 16 14 16C14.256 16 14.512 15.902 14.707 15.707L15.707 14.707C16.098 14.316 16.098 13.684 15.707 13.293ZM7 12C4.239 12 2 9.761 2 7C2 4.239 4.239 2 7 2C9.761 2 12 4.239 12 7C12 9.761 9.761 12 7 12Z" fill="currentColor"></path>
    </svg>
  )
}

export const CloseIcon = () => {
  const { handles: css } = useCssHandles(cssHandles)

  return (
    <svg className={css['swp-search-icon']} width="25px" height="25px">
      <g fill="currentColor">
        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
      </g>
    </svg>
  )
}
