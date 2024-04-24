import Image from 'next/image'
import { useEffect, useState } from 'react'

import Modal from '@/src/components/common/modal'
import ModalEdittodo from '@/src/components/common/modal/modal-edittodo'
import ModalTask from '@/src/components/common/modal/modal-task'
import { EMPTY_DUEDATE } from '@/src/constants/date'
import { TaskCardDataType } from '@/src/types/dashboard.interface'

import S from './TaskCard.module.scss'
import TaskCardDate from '../task-card-date'
import TaskCardTag from '../task-card-tag'

//TODO: TaskCardTag props 데이터
//TODO: 날짜 데이터
//TODO: 아이콘 navbar에서 받을 것
//TODO: 이미지 데이터

interface TaskCardProps {
  columnId: number | undefined
  taskCard: any //TODO: type 교체
}

const TaskCard = ({ columnId, taskCard }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardData, setCardData] = useState(taskCard)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <div className={S.container} onClick={() => setIsModalOpen(true)}>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalEdittodo
            columnId={columnId}
            cardData={cardData}
            setCardData={setCardData}
          />
        </Modal>
      )}
      <div className={S.imageWrapper}>
        <Image
          className={S.cardImage}
          src={cardData.imageUrl}
          width={274}
          height={160}
          layout="responsive"
          alt="카드 이미지"
        />
      </div>
      <div className={S.content}>
        <h2 className={S.cardTitle}>{cardData.title}</h2>
        <div className={S.wrapper}>
          <TaskCardTag tagType="프로젝트" />
          <div className={S.cardBottom}>
            <div className={cardData.dueDate === EMPTY_DUEDATE ? S.hidden : ''}>
              <TaskCardDate dueDate={cardData.dueDate} />
            </div>
            <div>아이콘</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
