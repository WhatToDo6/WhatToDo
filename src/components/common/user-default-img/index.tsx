import { CHIP_COLOR } from '@/src/constants/colorchip'
import { changeUserIdToColorIdx } from '@/src/utils/userIdToColorIdx'

import S from './UserDefaultImg.module.scss'

interface UserDefaultImgProps {
  nickname: string
  type:
    | 'dropdown'
    | 'dashboardHeader'
    | 'card'
    | 'dashboardHeaderMembers'
    | 'member'
  zIndex?: number
  userId: number | null
  onClick?: () => void
}

/**
 * @param type - 'dropdown' | 'dashboardHeader' | 'card' | 'dashboardHeaderMembers' | 'member'
 * @param nickname - string
 * @param zIndex - (optional) number 대시보드 헤더에서 zindex 를 다르게 하기 위해 쓰는 용도
 * @param userId - userId: number | null
 * @returns
 */

function UserDefaultImg({
  nickname,
  type,
  zIndex,
  userId,
  onClick,
}: UserDefaultImgProps) {
  const myIdx = userId ? changeUserIdToColorIdx(userId) : 3

  return (
    <div
      className={`${S.container} ${S[type]}`}
      style={{
        backgroundColor: `${CHIP_COLOR[myIdx ? myIdx : 1]}`,
        zIndex: zIndex ? zIndex : 'auto',
      }}
      onClick={onClick}
    >
      <p className={S.nickname}>{nickname.slice(0, 2)}</p>
    </div>
  )
}

export default UserDefaultImg
