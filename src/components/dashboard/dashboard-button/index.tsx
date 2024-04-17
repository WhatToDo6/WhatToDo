import Image from 'next/image'

import addBoardBtn from '@/public/icons/add-board-btn.svg'
import crownIcon from '@/public/icons/crown-icon.svg'
import rightArrow from '@/public/icons/right-arrow.svg'

import S from './dashboardButton.module.scss'

type MockData = {
  [key: string]: string
}

type DashboardButtonType =
  | 'add'
  | 'addColumn'
  | 'addDashboard'
  | 'moveDashboard'
  | 'deleteDashboard'

interface DashboardButtonProps {
  type: DashboardButtonType
  dashboard?: MockData
  onClick?: () => void
}

function DashboardButton({ dashboard, type, onClick }: DashboardButtonProps) {
  const BTN_CHILDREN: Record<DashboardButtonType, JSX.Element> = {
    add: (
      <Image className={S.addBoardBtn} src={addBoardBtn} alt="addBoardBtn" />
    ),
    addColumn: (
      <>
        <div>새로운 칼럼 추가하기</div>
        <Image className={S.addBoardBtn} src={addBoardBtn} alt="addBoardBtn" />
      </>
    ),
    addDashboard: (
      <>
        <div>새로운 대시보드</div>
        <Image className={S.addBoardBtn} src={addBoardBtn} alt="addBoardBtn" />
      </>
    ),
    moveDashboard: (
      <>
        <div className={S.infoBox}>
          <span>img1</span>
          <p>{dashboard && dashboard.name}</p>
          <Image src={crownIcon} alt="왕관" />
        </div>
        <Image src={rightArrow} alt="rightArrow" />
      </>
    ),

    deleteDashboard: <div>대시보드 삭제하기</div>,
  }

  return (
    <button className={`${S.btn} ${S[type]}`} onClick={onClick}>
      {BTN_CHILDREN[type]}
    </button>
  )
}

export default DashboardButton
