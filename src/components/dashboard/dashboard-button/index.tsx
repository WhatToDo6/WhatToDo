import Image from 'next/image'

import addBoardBtn from '@/public/icons/add-board-btn.svg'
import crownIcon from '@/public/icons/crown-icon.svg'
import rightArrow from '@/public/icons/right-arrow.svg'
import { DashboardType } from '@/src/types/mydashboard'

import S from './dashboardButton.module.scss'

type DashboardButtonType =
  | 'add'
  | 'addColumn'
  | 'addDashboard'
  | 'moveDashboard'
  | 'deleteDashboard'

type PartialDashboardButtonType = {
  [key in keyof DashboardType]?: DashboardType[key]
}

interface DashboardButtonProps extends PartialDashboardButtonType {
  type: DashboardButtonType
  onClick?: () => void
}

/**
 *
 * @param type - 'add' | 'addColumn' | 'addDashboard' | 'moveDashboard'  | 'deleteDashboard'
 * @param onClick - () => void - 함수를 한 번 감싸서 보내면 됩니다!
 * @param PartialDashboardButtonType - DashboardButtonType 을 확장해서 DashboardButtonType 의 타입들은 다 Prop 으로 적용할 수 있습니다.
 * @returns
 */

function DashboardButton({
  type,
  onClick,
  color,
  createdByMe,
  title,
}: DashboardButtonProps) {
  const BUTTON = {
    add: {
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
      children: (
        <>
          <div className={S.infoBox}>
            <div className={S.colorChip} style={{ backgroundColor: color }} />
            <p>{title}</p>
            {createdByMe && (
              <Image width={20} height={16} src={crownIcon} alt="왕관" />
            )}
          </div>
          <Image width={18} height={18} src={rightArrow} alt="rightArrow" />
        </>
      ),
    },
    deleteDashboard: {
      children: <div>대시보드 삭제하기</div>,
    },
  }

  return (
    <button className={`${S.btn} ${S[type]}`} onClick={onClick}>
      {BUTTON[type].children}
    </button>
  )
}

export default DashboardButton
