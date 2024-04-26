import { useEffect, useState } from 'react'

import { getTaskCards } from '@/pages/api/taskCards'
import ColumnHeader from '@/src/components/dashboard/column/column-header'
import TaskCard from '@/src/components/dashboard/column/task-card'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import {
  ColumnDataType,
  TaskCardDataType,
} from '@/src/types/dashboard.interface'

import S from './Column.module.scss'
import Modal from '../../common/modal'
import ModalTodo from '../../common/modal/modal-todo'

const Column = ({ id: columnId, title, dashboardId }: ColumnDataType) => {
  const [taskCards, setTaskCards] = useState<TaskCardDataType[]>([])
  const [nextCursorId, setNextCursorId] = useState<number | null>(null)
  const [getMore, setGetMore] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reload, setReload] = useState<any>(null)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const addNewTaskCard = (newTaskCard: TaskCardDataType) => {
    setTaskCards((prevTaskCards) => [...prevTaskCards, newTaskCard])
  }

  const fetchTaskCards = async (firstFetch: boolean = false) => {
    if (columnId) {
      try {
        const {
          data,
          nextCursorId: fetchNextCursorId,
          totalCount,
        } = await getTaskCards(
          columnId,
          firstFetch ? null : nextCursorId,
          firstFetch,
        )
        setTaskCards((prev) => (firstFetch ? data : [...prev, ...data]))
        setNextCursorId(fetchNextCursorId)
        setGetMore(taskCards.length + data.length < totalCount)
      } catch (error) {
        console.error('카드를 불러오는 데 실패했습니다.:', error)
      }
    }
  }

  useEffect(() => {
    fetchTaskCards(true)
  }, [columnId])

  useEffect(() => {
    reload && fetchTaskCards(true)
  }, [reload])

  return (
    <div className={S.container}>
      <ColumnHeader
        title={title}
        taskCount={taskCards.length}
        columnId={columnId}
      />
      <div className={S.taskWrapper}>
        <DashboardButton type="add" onClick={handleClick} />
        {Array.isArray(taskCards) &&
          taskCards.map((taskCard) => (
            <TaskCard
              key={taskCard.id}
              taskCard={taskCard}
              setTaskCards={setTaskCards}
              columnId={columnId}
              columnTitle={title}
              setReload={setReload}
            />
          ))}
      </div>
      {getMore && (
        <button className={S.getMoreCards} onClick={() => fetchTaskCards()}>
          더보기
        </button>
      )}
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalTodo
            columnId={columnId}
            dashboardId={dashboardId}
            onCreateTaskCard={addNewTaskCard}
          />
        </Modal>
      )}
    </div>
  )
}

export default Column
