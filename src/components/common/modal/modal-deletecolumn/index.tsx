import { useRouter } from 'next/router'
import { useContext } from 'react'

import S from './ModalDeleteColumn.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'

interface ModalDeleteColumn {
  content: string
  leftButtonText: string
  rightButtonText: string
  moveTo?: string
}

/**
 *
 * @param content - 모달 내부 내용
 * @param leftButtonText - 왼쪽 버튼 텍스트
 * @param leftButtonText - 오른쪽 버튼 텍스트
 * @param moveTo - (optional) 버튼 클릭 시 이동할 페이지 경로
 * @returns
 */
const ModalDeleteColumn = ({
  content,
  leftButtonText,
  rightButtonText,
  moveTo,
}: ModalDeleteColumn) => {
  const router = useRouter()
  const modalStaus = useContext(ModalContext)

  const handleLeftClick = () => {
    modalStaus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
  }

  const handleRigthClick = () => {
    modalStaus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
    // TO DO 삭제 버튼 클릭 시 수행해야할 부분 작성해주세요 !
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
          onRightClick={handleRigthClick}
        />
      </div>
    </div>
  )
}

export default ModalDeleteColumn
