import { createContext } from 'react'

import S from './Modal.module.scss'
import ModalPortal from './ModalPortal'

interface ModalProps {
  setIsOpen: (_: boolean) => void
  children: React.ReactNode
  deleteBackdrop?: React.CSSProperties
}

export const ModalContext = createContext({ setIsOpen: (_: boolean) => {} })

const Modal = ({ setIsOpen, children, deleteBackdrop }: ModalProps) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <ModalPortal>
      <ModalContext.Provider value={{ setIsOpen }}>
        <div
          className={S.background}
          onClick={(e) => closeModal(e)}
          style={deleteBackdrop}
        >
          <div className={S.modal}>{children}</div>
        </div>
      </ModalContext.Provider>
    </ModalPortal>
  )
}

export default Modal
