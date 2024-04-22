import { createContext } from 'react'

import S from './Modal.module.scss'
import ModalPortal from './ModalPortal'

interface ModalProps {
  setIsOpen: (_: boolean) => void
  children: React.ReactNode
}

export const ModalContext = createContext({ setIsOpen: (_: boolean) => {} })

const Modal = ({ setIsOpen, children }: ModalProps) => {
  return (
    <ModalPortal>
      <ModalContext.Provider value={{ setIsOpen }}>
        <div className={S.background}>
          <div className={S.modal}>{children}</div>
        </div>
      </ModalContext.Provider>
    </ModalPortal>
  )
}

export default Modal
