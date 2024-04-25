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

const TaskCard = ({
  columnId,
  taskCard,
  setTaskCards,
  columnTitle,
}: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className={S.container} onClick={() => setIsModalOpen(true)}>
        <div className={S.imageWrapper}>
          <Image
            className={S.cardImage}
            src={taskCard.imageUrl}
            width={274}
            height={160}
            layout="responsive"
            alt="카드 이미지"
          />
        </div>
        <div className={S.content}>
          <h2 className={S.cardTitle}>{taskCard.title}</h2>
          <div className={S.wrapper}>
            <div className={S.tag}>
              {taskCard.tags.map((tag, index) => (
                <TagChip key={index} index={index} text={tag} />
              ))}
            </div>
            <div className={S.cardBottom}>
              <div
                className={taskCard.dueDate === EMPTY_DUEDATE ? S.hidden : ''}
              >
                <TaskCardDate dueDate={taskCard.dueDate} />
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
            cardId={taskCard.id}
            title={taskCard.title}
            dueDate={taskCard.dueDate}
            assignee={taskCard.assignee}
            imageUrl={taskCard.imageUrl}
            tags={taskCard.tags}
            description={taskCard.description}
            columnTitle={columnTitle}
            taskCard={taskCard}
            setTaskCards={setTaskCards}
          />
        </Modal>
      )}
    </>
  )
}

export default TaskCard
