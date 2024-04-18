import ColumnHeader from './column-header'
import S from './Column.module.scss'
import TaskCard from './task-card'
import DashboardButton from '../dashboard-button'

const Column = () => {
  return (
    <div className={S.container}>
      <ColumnHeader />
      <div className={S.taskWrapper}>
        <DashboardButton type="add" />
        <TaskCard />
      </div>
    </div>
  )
}

export default Column
