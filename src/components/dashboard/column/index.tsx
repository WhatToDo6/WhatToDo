import AddTask from './add-task'
import ColumnHeader from './column-header'
import S from './Column.module.scss'
import TaskCard from './task-card'

const Column = () => {
  return (
    <div className={S.container}>
      <ColumnHeader />
      <div className={S.taskWrapper}>
        <AddTask />
        <TaskCard />
      </div>
    </div>
  )
}

export default Column
