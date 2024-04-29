import { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalPortalProps {
  children: ReactElement
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (typeof window === 'undefined') return null

  return isMounted
    ? createPortal(
        children,
        document.getElementById('modal-root') as HTMLElement,
      )
    : null
}

export default ModalPortal
