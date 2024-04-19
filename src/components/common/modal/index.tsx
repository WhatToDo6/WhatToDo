import { createContext } from 'react'

import S from './Modal.module.scss'

interface ModalProps {
  setIsOpen: (_: boolean) => void
  children: React.ReactNode
}

export const ModalContext = createContext({ setIsOpen: (_: boolean) => {} })

const Modal = ({ setIsOpen, children }: ModalProps) => {
  return (
    <ModalContext.Provider value={{ setIsOpen }}>
      <div className={S.background}>
        <div className={S.modal}>{children}</div>
      </div>
    </ModalContext.Provider>
  )
}

export default Modal
