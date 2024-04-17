import S from './TaskCard.module.scss'
import TaskCardTag from '../task-card-tag'

//TODO TaskCardTag props. 향후 데이터로 받아 와야 함

const TaskCard = () => {
  return (
    <div className={S.container}>
      <div className={S.cardHeading}>새로운 일정 관리 Taskify</div>
      <TaskCardTag tagType="상" />
    </div>
  )
}

export default TaskCard
