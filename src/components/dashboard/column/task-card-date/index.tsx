import Image from 'next/image'

import { TaskCardDateType } from '@/src/types/dashboard.interface'

import S from './TaskCardDate.module.scss'
import { CALENDAR } from '../constants'

const TaskCardDate = ({ dueDate }: TaskCardDateType) => {
  return (
    <div className={S.container}>
      <Image src={CALENDAR} width={18} height={18} alt="달력" />
      <div className={S.date}>{dueDate}</div>
    </div>
  )
}

export default TaskCardDate
