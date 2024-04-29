import { useEffect, useState } from 'react'

function useMobileSizeChange<T>(initialVal: T, mobileSizeVal: T) {
  const [changeableState, setChangeableState] = useState<T>(initialVal)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const handleResize = () => {
      if (mediaQuery.matches) {
        setChangeableState(mobileSizeVal)
      } else {
        setChangeableState(initialVal)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return changeableState
}

export default useMobileSizeChange
