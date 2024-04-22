import Image from 'next/image'

import { TaskCardDataType } from '@/src/types/dashboard.interface'

import S from './TaskCard.module.scss'
import TaskCardDate from '../task-card-date'
import TaskCardTag from '../task-card-tag'

//TODO: TaskCardTag props 데이터
//TODO: 날짜 데이터
//TODO: 아이콘 navbar에서 받을 것
//TODO: 이미지 데이터

const TaskCard = ({ title, dueDate, imageUrl, tags }: TaskCardDataType) => {
  return (
    <div className={S.container}>
      <div className={S.imageWrapper}>
        <Image
          className={S.cardImage}
          src={imageUrl}
          width={274}
          height={160}
          layout="responsive"
          alt="카드 이미지"
        />
      </div>
      <div className={S.content}>
        <h2 className={S.cardTitle}>{title}</h2>
        <div className={S.wrapper}>
          <TaskCardTag tagType="프로젝트" />
          <div className={S.cardBottom}>
            <TaskCardDate dueDate={dueDate} />
            <div>아이콘</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
