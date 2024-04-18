import { useRouter } from 'next/router'
import { useContext } from 'react'

import S from './ModalAlert.module.scss'
import { ModalContext } from '..'
import BorderButton from '../../button/border'

interface ModalAlertProps {
  content: string
  buttonText: string
  moveTo?: string
}

/**
 *
 * @param content - 모달 내부 내용
 * @param buttonText - 버튼 텍스트
 * @param moveTo - (optional) 버튼 클릭 시 이동할 페이지 경로
 * @returns
 */
const ModalAlert = ({ content, buttonText, moveTo }: ModalAlertProps) => {
  const router = useRouter()
  const modalStaus = useContext(ModalContext)
  const handleClick = () => {
    modalStaus.setIsOpen.bind(null, false)
    moveTo && router.push(moveTo)
  }

  return (
    <div className={S.container}>
      <span className={S.content}>{content}</span>
      <div className={S.button}>
        <BorderButton color="purple" size="large" onClick={handleClick}>
          {buttonText}
        </BorderButton>
      </div>
    </div>
  )
}

export default ModalAlert
