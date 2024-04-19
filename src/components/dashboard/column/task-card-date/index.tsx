import Image from 'next/image'

import S from './TaskCardDate.module.scss'
import { CALENDAR } from '../constants'

const TaskCardDate = () => {
  return (
    <div className={S.container}>
      <Image src={CALENDAR} width={18} height={18} alt="달력" />
      <div className={S.date}>2022.12.31</div>
    </div>
  )
}

export default TaskCardDate
