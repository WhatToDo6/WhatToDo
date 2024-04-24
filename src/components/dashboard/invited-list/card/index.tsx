import Image from 'next/image'

import AXIOS from '@/lib/axios'
import { fetchDeleteCancelInviteDashboard } from '@/pages/api/dashboards'
import { fetchPutAnswerInvitation } from '@/pages/api/invitations'
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
  id: number
  handleChange: (id: number) => void
  dashboardId?: number
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
  id,
  dashboardId,
  handleChange,
}: InvitedCardProps) {
  const className = `${S.container} ${isDashboardType(type) ? S.dashboard : ''}`

  const handleClickAnswerInvitation = async (answer: boolean) => {
    try {
      await fetchPutAnswerInvitation(id, answer)
      handleChange(id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickCancelIniviteEmail = async () => {
    try {
      if (dashboardId) await fetchDeleteCancelInviteDashboard(dashboardId, id)
      handleChange(id)
    } catch (err) {
      console.error(err)
    }
  }
  //TODO: member api 정리
  const handleClickDeleteDashboardMember = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      await AXIOS.delete(`/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      handleChange(id)
    } catch (err) {
      console.error(err)
    }
  }

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
          onLeftClick={() => handleClickAnswerInvitation(true)}
          onRightClick={() => handleClickAnswerInvitation(false)}
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
        <BorderButton
          size="small"
          color="white"
          onClick={handleClickDeleteDashboardMember}
        >
          삭제
        </BorderButton>
      </>
    ),
    email: (
      <>
        <p>{email}</p>
        <BorderButton
          size="small"
          color="white"
          onClick={handleClickCancelIniviteEmail}
        >
          취소
        </BorderButton>
      </>
    ),
  }

  return <div className={className}>{INVITED_CARD[type]}</div>
}

export default InvitedListCard
