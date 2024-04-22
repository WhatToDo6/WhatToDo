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
  const [getMore, setGetMore] = useState(true)

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
        setGetMore(taskCards.length + data.length < totalCount)
      } catch (error) {
        console.error('카드를 불러오는 데 실패했습니다.:', error)
      }
    }
  }

  useEffect(() => {
    fetchTaskCards(true)
  }, [columnId])

  return (
    <div className={S.container}>
      <ColumnHeader
        title={title}
        taskCount={taskCards.length}
        columnId={columnId}
      />
      <div className={S.taskWrapper}>
        <DashboardButton type="add" />
        {taskCards.map((taskCard) => (
          <TaskCard key={taskCard.id} {...taskCard} />
        ))}
      </div>
      {getMore && (
        <button className={S.getMoreCards} onClick={() => fetchTaskCards()}>
          더보기
        </button>
      )}
    </div>
  )
}

export default Column
