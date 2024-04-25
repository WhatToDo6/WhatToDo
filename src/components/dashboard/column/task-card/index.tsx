import Image from 'next/image'
import { useState } from 'react'

import TagChip from '@/src/components/common/chip/tag-chip'
import Modal from '@/src/components/common/modal'
import ModalTask from '@/src/components/common/modal/modal-task'
import { EMPTY_DUEDATE } from '@/src/constants/date'
import { TaskCardDataType } from '@/src/types/dashboard.interface'

import S from './TaskCard.module.scss'
import TaskCardDate from '../task-card-date'

interface TaskCardProps {
  columnId: number | undefined
  taskCard: TaskCardDataType
  columnTitle: string
}

const TaskCard = ({ columnId, taskCard, columnTitle }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardData, setCardData] = useState(() => {
    const tagColorsLength = 4
    const colorIndex = Math.floor(Math.random() * tagColorsLength)
    return { ...taskCard, colorIndex }
  })

  return (
    <>
      <div className={S.container} onClick={() => setIsModalOpen(true)}>
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
            <TagChip index={cardData.colorIndex} text={cardData.tags[0]} />
            <div className={S.cardBottom}>
              <div
                className={cardData.dueDate === EMPTY_DUEDATE ? S.hidden : ''}
              >
                <TaskCardDate dueDate={cardData.dueDate} />
              </div>
              <div>아이콘</div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalTask
            columnId={columnId}
            cardId={cardData.id}
            title={cardData.title}
            dueDate={cardData.dueDate}
            assignee={cardData.assignee}
            imageUrl={cardData.imageUrl}
            tags={cardData.tags}
            description={cardData.description}
            cardData={cardData}
            setCardData={setCardData}
            columnTitle={columnTitle}
          />
        </Modal>
      )}
    </>
  )
}

export default TaskCard
