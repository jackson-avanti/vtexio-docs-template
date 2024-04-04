import { useRuntime } from 'vtex.render-runtime'

const useIsDesktop = () => {
  const {
    deviceInfo: { isMobile },
  } = useRuntime()

  return !isMobile
}

export default useIsDesktop
