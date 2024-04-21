import { useEffect, useState } from 'react'

import { getTaskCards } from '@/pages/api/taskCards'
import ColumnHeader from '@/src/components/dashboard/column/column-header'
import TaskCard from '@/src/components/dashboard/column/task-card'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import {
  ColumnDataType,
  TaskCardDataType,
  GetTaskCards,
} from '@/src/types/dashboard.interface'

import S from './Column.module.scss'

const Column = ({ id: columnId, title }: ColumnDataType) => {
  const [taskCards, setTaskCards] = useState<TaskCardDataType[]>([])
  const [nextCursorId, setNextCursorId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchTaskCards = async (firstFetch: boolean = false) => {
    if (columnId) {
      try {
        const {
          data,
          nextCursorId: fetchNextCursorId,
          totalCount,
        }: GetTaskCards = await getTaskCards(
          columnId,
          firstFetch ? null : nextCursorId,
          firstFetch,
        )
        setTaskCards((prev) => (firstFetch ? data : [...prev, ...data]))
        setNextCursorId(fetchNextCursorId)
        setHasMore(taskCards.length + data.length < totalCount)
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    fetchTaskCards(true)
  }, [columnId])

  return (
    <div className={S.container}>
      <ColumnHeader title={title} taskCount={taskCards.length} />
      <div className={S.taskWrapper}>
        <DashboardButton type="add" />
        {taskCards.map((taskCard) => (
          <TaskCard key={taskCard.id} {...taskCard} />
        ))}
      </div>
      {hasMore && (
        <div className={S.loadMoreWrapper}>
          <button className={S.loadMoreButton} onClick={() => fetchTaskCards()}>
            더보기
          </button>
        </div>
      )}
    </div>
  )
}

export default Column
