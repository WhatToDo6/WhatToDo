import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import basicImg from '@/public/icons/temp-circle-1.svg'

import S from './ManagerProfile.module.scss'
import UserDefaultImg from '../user-default-img'

interface ManagerProfileProps {
  type: 'dropdown' | 'dashboardHeader' | 'card' | 'member'
  profileImageUrl: string | null
  nickname: string
  showPopover?: boolean
  userId: number | null
}

/**
 *
 * @param type - 'dropdown' | 'dashboardHeader' | 'card' | 'member'
 * @param profileImageUrl - string | null
 * @param nickname - string
 * @param showPopover - (optional) 팝오버의 유무를 결정
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
    //TODO 로그아웃 구현
    setIsPopoverOpen((prev) => !prev)
  }

  return (
    <div className={`${S.container} ${S[type]}`}>
      {profileImageUrl ? (
        <div className={`${S.imgDiv} ${S[type]}`}>
          <Image
            fill
            src={profileImageUrl ? profileImageUrl : basicImg}
            alt="profileImg"
            className={S.img}
            onClick={togglePopover}
          />
        </div>
      ) : (
        <UserDefaultImg
          type={type}
          nickname={nickname}
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
