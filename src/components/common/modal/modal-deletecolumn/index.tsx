import { useRouter } from 'next/router'
import { useContext } from 'react'

import { deleteColumns } from '@/pages/api/columns'
import { useColumnsContext } from '@/src/components/dashboard/column/column-layout'

import S from './ModalDeleteColumn.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'

interface ModalDeleteColumn {
  columnId: number | undefined
  content: string
  leftButtonText: string
  rightButtonText: string
  moveTo?: string
}

/**
 * @param columnId - 컬럼id
 * @param content - 모달 내부 내용
 * @param leftButtonText - 왼쪽 버튼 텍스트
 * @param leftButtonText - 오른쪽 버튼 텍스트
 * @param moveTo - (optional) 버튼 클릭 시 이동할 페이지 경로
 * @returns
 */
const ModalDeleteColumn = ({
  columnId,
  content,
  leftButtonText,
  rightButtonText,
  moveTo,
}: ModalDeleteColumn) => {
  const router = useRouter()
  const modalStatus = useContext(ModalContext)
  const { setColumns } = useColumnsContext()

  const handleLeftClick = () => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
  }

  const handleRightClick = async () => {
    try {
      await deleteColumns(columnId)
      setColumns((prevColumns) =>
        prevColumns.filter((column) => column.id !== columnId),
      )
      modalStatus.setIsOpen(false)
      moveTo && router.push(moveTo)
    } catch (error) {
      console.error('Failed to delete column:', error)
      modalStatus.setIsOpen(false)
    }
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

export default ModalDeleteColumn
