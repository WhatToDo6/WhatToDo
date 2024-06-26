import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import S from './ManagerProfile.module.scss'
import UserDefaultImg from '../user-default-img'

type ManagerProfileType =
  | 'dropdown'
  | 'dashboardHeader'
  | 'card'
  | 'member'
  | 'onlyImg'
interface ManagerProfileProps {
  type: ManagerProfileType
  profileImageUrl: string | null | undefined
  nickname?: string
  showPopover?: boolean
  userId: number | null
}

/**
 *
 * @param type - 'dropdown' | 'dashboardHeader' | 'card' | 'member' | 'onlyImg'
 * @param profileImageUrl - string | null
 * @param nickname - string
 * @param showPopover - (optional) 팝오버의 유무를 결정
 * @param userId = number | null
 * @returns
 */

function ManagerProfile({
  profileImageUrl,
  nickname,
  type,
  showPopover = false,
  userId,
}: ManagerProfileProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const router = useRouter()

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev)
  }

  const handleMyInfoClick = () => {
    router.push('/mypage')
    setIsPopoverOpen((prev) => !prev)
  }

  const handleLogout = () => {
    setIsPopoverOpen((prev) => !prev)
    localStorage.removeItem('accessToken')
    router.push('/')
  }

  return (
    <div className={`${S.container} ${S[type]}`}>
      {profileImageUrl ? (
        <div className={`${S.imgDiv} ${S[type]}`}>
          <Image
            fill
            src={profileImageUrl}
            alt="profileImg"
            className={S.img}
            onClick={togglePopover}
          />
        </div>
      ) : (
        <UserDefaultImg
          type={type}
          nickname={nickname ? nickname : '닉네임'}
          userId={userId}
          onClick={togglePopover}
        />
      )}

      {showPopover && isPopoverOpen && (
        <div className={S.popoverContainer}>
          <button className={S.popoverOption} onClick={handleMyInfoClick}>
            내 정보
          </button>
          <button className={S.popoverOption} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
      <span>{nickname}</span>
    </div>
  )
}

export default ManagerProfile
