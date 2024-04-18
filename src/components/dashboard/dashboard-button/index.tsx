import Image from 'next/image'

import addBoardBtn from '@/public/icons/add-board-btn.svg'
import rightArrow from '@/public/icons/right-arrow.svg'

import S from './dashboardButton.module.scss'

type MockData = {
  [key: string]: string
}

interface DashboardButtonProps {
  dashboard?: MockData
}

function DashboardButton({ dashboard }: DashboardButtonProps) {
  const btnClassName = `${S.btn} ${
    dashboard ? S.withDashboard : S.withoutDashboard
  }`

  if (!dashboard) {
    return (
      <button className={btnClassName}>
        <div>새로운 대시보드</div>
        <Image
          width={22}
          height={22}
          className={S.addBoardBtn}
          src={addBoardBtn}
          alt="addBoardBtn"
        />
      </button>
    )
  }

  return (
    <button className={btnClassName}>
      <div className={S.infoBox}>
        <span>img1</span>
        <div>{dashboard.name}</div>
        <span>img1</span>
      </div>
      <Image width={18} height={18} src={rightArrow} alt="rightArrow" />
    </button>
  )
}

export default DashboardButton
