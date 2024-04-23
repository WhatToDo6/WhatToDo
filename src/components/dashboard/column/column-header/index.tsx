import Image from 'next/image'
import { useState } from 'react'

import { putColumns } from '@/pages/api/columns'
import Modal from '@/src/components/common/modal'
import ModalDashBoard from '@/src/components/common/modal/modal-dashboard'
import {
  ColumnHeaderType,
  ColumnTitleType,
} from '@/src/types/dashboard.interface'

import S from './ColumnHeader.module.scss'
import { SETTING } from '../constants'

const ColumnHeader = ({
  title: initialTitle,
  taskCount,
  columnId,
}: ColumnHeaderType) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState(initialTitle)

  const handleClick = () => {
    setIsModalOpen(true)
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
      setIsModalOpen(false)
    } catch (error) {
      console.error('컬럼 데이터를 업데이트하는 데 실패했습니다:', error)
    }
  }

  return (
    <header className={S.wrapper}>
      <div className={S.columnHeading}>
        <div className={S.ellipse} />
        <div className={S.columnTitle}>{title}</div>
        <div className={S.cardCount}>{taskCount}</div>
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
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
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
          />
        </Modal>
      )}
    </header>
  )
}

export default ColumnHeader
