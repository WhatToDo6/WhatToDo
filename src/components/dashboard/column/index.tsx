import { getTaskCards } from '@/pages/api/taskCards'
import useFetchData from '@/src/hooks/useFetchData'
import { ColumnDataType } from '@/src/types/dashboard.interface'
import { TaskCardDataType } from '@/src/types/dashboard.interface'

import ColumnHeader from './column-header'
import S from './Column.module.scss'
import TaskCard from './task-card'
import DashboardButton from '../dashboard-button'

const Column = ({ id: columnId, title }: ColumnDataType) => {
  const { data: taskCards } = useFetchData<
    TaskCardDataType[],
    [number, number | undefined]
  >(getTaskCards, [3, columnId])

  return (
    <div className={S.container}>
      <ColumnHeader title={title} taskCount={taskCards?.length} />
      <div className={S.taskWrapper}>
        <DashboardButton type="add" />
        {taskCards?.map((taskCard: any) => (
          <TaskCard key={taskCard.id} {...taskCard} />
        ))}
      </div>
    </div>
  )
}

export default Column
