import { useContext } from 'react'

import S from './ModalAlert.module.scss'
import { ModalContext } from '..'
import BorderButton from '../../button/border'

interface ModalAlertProps {
  content: string
  buttonText: string
}

const ModalAlert = ({ content, buttonText }: ModalAlertProps) => {
  const modalStaus = useContext(ModalContext)

  return (
    <div className={S.container}>
      <span className={S.content}>{content}</span>
      <div className={S.button}>
        <BorderButton
          color="purple"
          size="large"
          onClick={modalStaus.setIsOpen.bind(null, false)}
        >
          {buttonText}
        </BorderButton>
      </div>
    </div>
  )
}

export default ModalAlert
