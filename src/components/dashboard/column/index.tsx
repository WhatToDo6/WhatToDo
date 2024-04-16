import AddTask from './add-task'
import ColumnHeader from './column-header'
import S from './Column.module.scss'

const Column = () => {
  return (
    <div className={S.Container}>
      <ColumnHeader />
      <AddTask />
    </div>
  )
}

export default Column
