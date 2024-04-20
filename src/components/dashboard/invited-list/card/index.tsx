import Image from 'next/image'

import basicImg from '@/public/icons/temp-circle-6.svg'
import BorderButton from '@/src/components/common/button/border'
import OptionButton from '@/src/components/common/button/option'
import {
  InvitedListDashboardType,
  InvitedListEmailType,
  InvitedMemberType,
} from '@/src/types/mydashboard'

import S from './InviteCard.module.scss'

type InvitedListType = 'dashboard' | 'member' | 'email'

type Partial<T> = {
  [key in keyof T]?: T[key]
}

type PartialInvitedListDashboardType = Partial<InvitedListDashboardType>
type PartialInvitedListEmailType = Partial<InvitedListEmailType>
type PartialInvitedMemberType = Partial<InvitedMemberType>
type PartialDashboardType = Partial<InvitedListDashboardType['dashboard']>

interface UnionPartialType
  extends PartialInvitedListDashboardType,
    PartialInvitedListEmailType,
    PartialDashboardType,
    PartialInvitedMemberType {}

interface InvitedCardProps extends UnionPartialType {
  type: InvitedListType
}

function isDashboardType(type: InvitedListType): type is 'dashboard' {
  return type === 'dashboard'
}

function InvitedListCard({
  title,
  type,
  email,
  nickname,
  profileImageUrl,
}: InvitedCardProps) {
  const className = `${S.container} ${isDashboardType(type) ? S.dashboard : ''}`

  const INVITED_CARD = {
    dashboard: (
      <>
        <p>{title}</p>
        <p>{nickname}</p>
        <OptionButton
          size="medium"
          leftColor="purple"
          rightColor="white"
          leftText="수락"
          rightText="거절"
        />
      </>
    ),
    member: (
      <>
        <div className={S.userBox}>
          <Image
            src={profileImageUrl ? profileImageUrl : basicImg}
            alt="프로필이미지"
            width={38}
            height={38}
          />
          <p>{nickname}</p>
        </div>
        <BorderButton size="small" color="white">
          삭제
        </BorderButton>
      </>
    ),
    email: (
      <>
        <p>{email}</p>
        <BorderButton size="small" color="white">
          취소
        </BorderButton>
      </>
    ),
  }

  return <div className={className}>{INVITED_CARD[type]}</div>
}

export default InvitedListCard
