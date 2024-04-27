import Image from 'next/image'
import { useContext, useState } from 'react'

import { putColumns } from '@/pages/api/columns'
import Modal, { ModalContext } from '@/src/components/common/modal'
import ModalDashBoard from '@/src/components/common/modal/modal-dashboard'
import ModalDeleteColumn from '@/src/components/common/modal/modal-deletecolumn'
import {
  ColumnHeaderType,
  ColumnTitleType,
} from '@/src/types/dashboard.interface'

import S from './ColumnHeader.module.scss'
import { SETTING } from '../constants'

const ColumnHeader = ({
  title: initialTitle,
  columnId,
  totalCount,
}: ColumnHeaderType) => {
  const modalStatus = useContext(ModalContext)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteEditModalOpen] = useState(false)

  const [title, setTitle] = useState(initialTitle)

  const handleClick = () => {
    setIsEditModalOpen(true)
  }

  const handleAPI = async (data: ColumnTitleType) => {
    try {
      const requestData: { title: string | undefined } = {
        title: data.columnName,
      }
      await putColumns(columnId, requestData)
      if (data.columnName !== undefined) {
        setTitle(data.columnName)
      }
      setIsEditModalOpen(false)
    } catch (error) {
      console.error('컬럼 데이터를 업데이트하는 데 실패했습니다:', error)
    }
  }

  return (
    <header className={S.wrapper}>
      <div className={S.columnHeading}>
        <div className={S.ellipse} />
        <div className={S.columnTitle}>{title}</div>
        <div className={S.cardCount}>{totalCount}</div>
      </div>
      <div onClick={handleClick}>
        <Image
          className={S.setting}
          src={SETTING}
          width={24}
          height={24}
          alt="설정"
        />
      </div>
      {isEditModalOpen && (
        <Modal setIsOpen={setIsEditModalOpen}>
          <ModalDashBoard
            columnId={columnId}
            title="컬럼 관리"
            inputTitle="이름"
            inputType="columnName"
            placeholder="Done"
            leftButtonText="취소"
            rightButtonText="변경"
            showDeleteButton={true}
            onSubmit={handleAPI}
            setIsDeleteEditModalOpen={setIsDeleteEditModalOpen}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          setIsOpen={modalStatus.setIsOpen}
          deleteBackdrop={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
          <ModalDeleteColumn
            columnId={columnId}
            content="칼럼의 모든 카드가 삭제됩니다."
            leftButtonText="취소"
            rightButtonText="삭제"
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDeleteEditModalOpen={setIsDeleteEditModalOpen}
          />
        </Modal>
      )}
    </header>
  )
}

export default ColumnHeader
