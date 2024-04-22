import Image from 'next/image'

import basicImg from '@/public/icons/temp-circle-1.svg'

import S from './ManagerProfile.module.scss'

interface ManagerProfileProps {
  type: 'dropdown' | 'dashboardHeader' | 'card'
  profileImageUrl: string | null
  nickname: string
}

/**
 *
 * @param type - 'dropdown' | 'dashboardHeader' | 'card'
 * @param profileImageUrl - string | null
 * @param nickname - string
 * @returns
 */

function ManagerProfile({
  profileImageUrl,
  nickname,
  type,
}: ManagerProfileProps) {
  const SIZE = {
    dashboardHeader: 38,
    dropdown: 26,
    card: 34,
  }
  return (
    <div className={`${S.container} ${S[type]}`}>
      <Image
        width={SIZE[type]}
        height={SIZE[type]}
        src={profileImageUrl ? profileImageUrl : basicImg}
        alt="profileImg"
      />
      <span>{nickname}</span>
    </div>
  )
}

export default ManagerProfile
