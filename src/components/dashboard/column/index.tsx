import { useEffect, useState } from 'react'

import { getTaskCards } from '@/pages/api/taskCards'
import ColumnHeader from '@/src/components/dashboard/column/column-header'
import TaskCard from '@/src/components/dashboard/column/task-card'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import { ColumnDataType, TaskCardDataType } from '@/src/types/dashboard'

import S from './Column.module.scss'
import Modal from '../../common/modal'
import ModalTodo from '../../common/modal/modal-todo'
import Spinner from '../../common/spinner'

const Column = ({ id: columnId, title, dashboardId }: ColumnDataType) => {
  const [taskCards, setTaskCards] = useState<TaskCardDataType[]>([])
  const [nextCursorId, setNextCursorId] = useState<number | null>(null)
  const [getMore, setGetMore] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const addNewTaskCard = (newTaskCard: TaskCardDataType) => {
    setTaskCards((prevTaskCards) => [...prevTaskCards, newTaskCard])
    setTotalCount((prevCount) => prevCount + 1)
  }

  const fetchTaskCards = async (firstFetch: boolean = false) => {
    if (columnId) {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const {
          data,
          nextCursorId: fetchNextCursorId,
          totalCount,
        } = await getTaskCards(
          columnId,
          firstFetch ? null : nextCursorId,
          firstFetch,
          3,
        )
        setTaskCards((prev) => (firstFetch ? data : [...prev, ...data]))
        setNextCursorId(fetchNextCursorId)
        setGetMore(taskCards.length + data.length < totalCount)
        setTotalCount(totalCount)
      } catch (error) {
        console.error('카드를 불러오는 데 실패했습니다.:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchTaskCards(true)
  }, [columnId])

  return (
    <div className={S.container}>
      <ColumnHeader title={title} columnId={columnId} totalCount={totalCount} />
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
            />
          ))}
      </div>
      {taskCards.length > 0 && getMore && (
        <div className={S.getMoreCardWrapper}>
          <div className={S.spinnerWrapper}>{isLoading && <Spinner />}</div>
          {!isLoading && (
            <button className={S.getMoreCards} onClick={() => fetchTaskCards()}>
              더보기
            </button>
          )}
        </div>
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
