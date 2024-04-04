import React from 'react'
import useCurrentMinOrderValue from '../hooks/useCurrentMinOrderValue';

type MinicartFooterContext = {
  isMinValueRechead: boolean,
  minValue: number,
  totalizerItems: number,
  loading: boolean
}

type Props = {
  children: React.ReactNode
}

export const MinicartFooterContext = React.createContext({} as MinicartFooterContext);

export const MinicartFooterProvider: React.FC<Props> = ({ children }) => {
  const currentMinOrderValue = useCurrentMinOrderValue();
  return (
    <MinicartFooterContext.Provider value={{ ...currentMinOrderValue }}>
      {children}
    </MinicartFooterContext.Provider>
  )
}

export const useMinicartFooter = () => React.useContext(MinicartFooterContext)
