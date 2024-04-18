import Image from 'next/image'

import TaskCardImg from '@/public/images/task-card-img.png'

import S from './TaskCard.module.scss'
import TaskCardDate from '../task-card-date'
import TaskCardTag from '../task-card-tag'

//TODO: TaskCardTag props 데이터
//TODO: 날짜 데이터
//TODO: 아이콘 navbar에서 받을 것
//TODO: 이미지 데이터

const TaskCard = () => {
  return (
    <div className={S.container}>
      <div className={S.imageWrapper}>
        <Image
          className={S.cardImage}
          src={TaskCardImg}
          fill
          priority
          alt="카드 이미지"
        />
      </div>
      <div className={S.content}>
        <h2 className={S.cardHeading}>새로운 일정 관리 Taskify</h2>
        <div className={S.wrapper}>
          <TaskCardTag tagType="프로젝트" />
          <div className={S.cardBottom}>
            <TaskCardDate />
            <div>아이콘</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
