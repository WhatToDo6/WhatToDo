import Image from 'next/image'
import { useState } from 'react'

import TagChip from '@/src/components/common/chip/tag-chip'
import ManagerProfile from '@/src/components/common/manager-profile'
import Modal from '@/src/components/common/modal'
import ModalTask from '@/src/components/common/modal/modal-task'
import { EMPTY_DUEDATE } from '@/src/constants/date'
import { useUser } from '@/src/context/users'
import { TaskCardDataType } from '@/src/types/dashboard.interface'

import S from './TaskCard.module.scss'
import TaskCardDate from '../task-card-date'

interface TaskCardProps {
  columnId: number | undefined
  taskCard: TaskCardDataType
  setTaskCards: React.Dispatch<React.SetStateAction<TaskCardDataType[]>>
  columnTitle: string
}

const TaskCard = ({
  columnId,
  taskCard,
  setTaskCards,
  columnTitle,
}: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardData, setCardData] = useState<TaskCardDataType>(taskCard)
  const { userData } = useUser()

  return (
    <>
      <div className={S.container} onClick={() => setIsModalOpen(true)}>
        <div
          className={`${S.imageWrapper} ${!cardData.imageUrl ? S.hidden : ''}`}
        >
          {cardData.imageUrl && (
            <Image
              className={S.cardImage}
              src={cardData.imageUrl}
              width={274}
              height={160}
              layout="responsive"
              alt="카드 이미지"
            />
          )}
        </div>
        <div className={S.content}>
          <h2 className={S.cardTitle}>{cardData.title}</h2>
          <div className={S.wrapper}>
            <div className={S.tag}>
              {cardData.tags.map((tag, index) => (
                <TagChip key={index} index={index} text={tag} />
              ))}
            </div>
            <div className={S.cardBottom}>
              <div
                className={cardData.dueDate === EMPTY_DUEDATE ? S.hidden : ''}
              >
                <TaskCardDate dueDate={cardData.dueDate} />
              </div>
              <div>
                <ManagerProfile
                  profileImageUrl={userData?.profileImageUrl}
                  type="onlyImg"
                  nickname={userData?.nickname}
                  userId={userData ? userData.id : null}
                />
              </div>
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
            columnTitle={columnTitle}
            cardData={cardData}
            setCardData={setCardData}
            setTaskCards={setTaskCards}
          />
        </Modal>
      )}
    </>
  )
}

export default TaskCard
