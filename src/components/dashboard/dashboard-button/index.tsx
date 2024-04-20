import Image from 'next/image'
import { useRouter } from 'next/router'

import { DashboardType } from '@/pages/mydashboard'
import addBoardBtn from '@/public/icons/add-board-btn.svg'
import crownIcon from '@/public/icons/crown-icon.svg'
import rightArrow from '@/public/icons/right-arrow.svg'

import S from './dashboardButton.module.scss'

type DashboardButtonType =
  | 'add'
  | 'addColumn'
  | 'addDashboard'
  | 'moveDashboard'
  | 'deleteDashboard'

//TODO 타입 확장해서 적용하기
interface DashboardButtonProps {
  type: DashboardButtonType
  dashboard?: DashboardType
  id?: number
  color?: string
  createdByMe?: boolean
}

function DashboardButton({
  dashboard,
  type,
  id,
  color,
  createdByMe,
}: DashboardButtonProps) {
  const router = useRouter()

  const BUTTON = {
    add: {
      onClick: () => {},
      children: (
        <Image
          width={22}
          height={22}
          className={S.addBoardBtn}
          src={addBoardBtn}
          alt="addBoardBtn"
        />
      ),
    },
    addColumn: {
      onClick: () => {},
      children: (
        <>
          <div>새로운 칼럼 추가하기</div>
          <Image
            width={22}
            height={22}
            className={S.addBoardBtn}
            src={addBoardBtn}
            alt="addBoardBtn"
          />
        </>
      ),
    },
    addDashboard: {
      onClick: () => {},
      children: (
        <>
          <div>새로운 대시보드</div>
          <Image
            width={22}
            height={22}
            className={S.addBoardBtn}
            src={addBoardBtn}
            alt="addBoardBtn"
          />
        </>
      ),
    },
    moveDashboard: {
      onClick: () => {
        router.push(`/dashboard/${id}`)
      },
      children: (
        <>
          <div className={S.infoBox}>
            <div className={S.colorChip} style={{ backgroundColor: color }} />
            <p>{dashboard && dashboard.title}</p>
            {createdByMe && (
              <Image width={20} height={16} src={crownIcon} alt="왕관" />
            )}
          </div>
          <Image width={18} height={18} src={rightArrow} alt="rightArrow" />
        </>
      ),
    },
    deleteDashboard: {
      onClick: () => {},
      children: <div>대시보드 삭제하기</div>,
    },
  }

  return (
    <button className={`${S.btn} ${S[type]}`} onClick={BUTTON[type].onClick}>
      {BUTTON[type].children}
    </button>
  )
}

export default DashboardButton
