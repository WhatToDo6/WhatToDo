import S from './TaskCard.module.scss'
import TaskCardBadge from '../task-card-badge'

const TaskCard = () => {
  return (
    <div className={S.container}>
      <div className={S.cardHeading}>새로운 일정 관리 Taskify</div>
      <TaskCardBadge />
    </div>
  )
}

export default TaskCard
