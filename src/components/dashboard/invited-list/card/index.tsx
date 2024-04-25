import Image from 'next/image'
import { useContext } from 'react'

import AXIOS from '@/lib/axios'
import { fetchDeleteCancelInviteDashboard } from '@/pages/api/dashboards'
import { fetchPutAnswerInvitation } from '@/pages/api/invitations'
import basicImg from '@/public/icons/temp-circle-6.svg'
import BorderButton from '@/src/components/common/button/border'
import OptionButton from '@/src/components/common/button/option'
import UserDefaultImg from '@/src/components/common/user-default-img'
import { DashboardsContext } from '@/src/context/dashboards'
import {
  InvitedListDashboardType,
  InvitedListEmailType,
  InvitedMemberType,
} from '@/src/types/mydashboard'

import S from './InviteCard.module.scss'

type InvitedListType = 'dashboard' | 'member' | 'email'

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

function InvitedListCard({
  title,
  type,
  email,
  nickname,
  profileImageUrl,
  id,
  dashboardId,
  handleChange,
  isOwner,
}: InvitedCardProps) {
  const className = `${S.container} ${S[type]}`
  const { getSideMenuDashboards } = useContext(DashboardsContext)

  const handleClickAnswerInvitation = async (answer: boolean) => {
    try {
      await fetchPutAnswerInvitation(id, answer)
      getSideMenuDashboards()
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
        <span>
          <p className={S.mobileTag}>이름</p>
          {title}
        </span>
        <span>
          <p className={S.mobileTag}>초대자</p>
          {nickname}
        </span>
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
          {profileImageUrl ? (
            <div className={S.userImgDiv}>
              <Image
                className={S.userImg}
                src={profileImageUrl ? profileImageUrl : basicImg}
                alt="프로필이미지"
                fill
              />
            </div>
          ) : (
            <UserDefaultImg
              nickname={nickname ? nickname : '없음'}
              type="member"
              userId={id}
            />
          )}

          <span>{nickname}</span>
        </div>
        <BorderButton
          size="small"
          color={isOwner ? 'purple' : 'white'}
          onClick={handleClickDeleteDashboardMember}
          isDisabled={isOwner}
        >
          {isOwner ? '관리자' : '삭제'}
        </BorderButton>
      </>
    ),
    email: (
      <>
        <span>{email}</span>
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
