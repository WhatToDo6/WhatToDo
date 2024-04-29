import { useContext } from 'react'

import { ModalConfirmProps } from '@/src/types/modal'

import S from './ModalConfirm.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'

/**
 * @param content - 모달 내부 내용
 * @param leftButtonText - 왼쪽 버튼 텍스트
 * @param leftButtonText - 오른쪽 버튼 텍스트
 * @param onClick - 실행할 함수
 * @returns
 */

const ModalConfirm = ({
  content,
  leftButtonText,
  rightButtonText,
  onClick,
}: ModalConfirmProps) => {
  const modalStatus = useContext(ModalContext)

  const handleLeftClick = () => {
    modalStatus.setIsOpen.call(null, false)
  }

  const handleRightClick = () => {
    modalStatus.setIsOpen.call(null, false)
    onClick()
  }

  return (
    <div className={S.container}>
      <span className={S.content}>{content}</span>
      <div className={S.button}>
        <OptionButton
          size="large"
          leftColor="white"
          rightColor="purple"
          leftText={leftButtonText}
          rightText={rightButtonText}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
      </div>
    </div>
  )
}

export default ModalConfirm
