import Image from 'next/image'
import { useContext, useState } from 'react'

import { fetchDeleteCancelInviteDashboard } from '@/pages/api/dashboards'
import { fetchPutAnswerInvitation } from '@/pages/api/invitations'
import { fetchDeleteDashboardMember } from '@/pages/api/members'
import BorderButton from '@/src/components/common/button/border'
import OptionButton from '@/src/components/common/button/option'
import Modal from '@/src/components/common/modal'
import ModalConfirm from '@/src/components/common/modal/modal-confirm'
import UserDefaultImg from '@/src/components/common/user-default-img'
import { DashboardsContext } from '@/src/context/dashboards'
import { useToast } from '@/src/context/toast'
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
  userId?: number
}

function isInEditPage(type: InvitedListType): type is 'member' | 'email' {
  return type !== 'dashboard'
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
  userId,
}: InvitedCardProps) {
  const className = `${S.container} ${S[type]}`
  const myUserId = userId ? userId : null
  const { getSideMenuDashboards } = useContext(DashboardsContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToast } = useToast()

  const handleClick = () => {
    setIsModalOpen(true)
  }

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
    try {
      await fetchDeleteDashboardMember(id)
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
                src={profileImageUrl}
                alt="프로필이미지"
                fill
              />
            </div>
          ) : (
            <UserDefaultImg
              nickname={nickname ? nickname : '닉네임'}
              type="member"
              userId={myUserId}
            />
          )}

          <span>{nickname}</span>
        </div>
        <BorderButton
          size="small"
          color="white"
          onClick={
            isOwner
              ? () => addToast('관리자는 삭제 할 수 없습니다.', 'error')
              : handleClick
          }
        >
          삭제
        </BorderButton>
      </>
    ),
    email: (
      <>
        <span>{email}</span>
        <BorderButton size="small" color="white" onClick={handleClick}>
          취소
        </BorderButton>
      </>
    ),
  }

  const EDIT_PAGE_MODAL = {
    member: {
      message: `${nickname}을 구성원에서 삭제하시겠습니까?`,
      onClick: handleClickDeleteDashboardMember,
      leftButtonText: '취소',
      rightButtonText: '삭제',
    },
    email: {
      message: `${email}에 대한 초대를 취소하시겠습니까?`,
      onClick: handleClickCancelIniviteEmail,
      leftButtonText: '취소',
      rightButtonText: '확인',
    },
  }

  return (
    <>
      {isModalOpen && isInEditPage(type) && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalConfirm
            content={`${EDIT_PAGE_MODAL[type].message}`}
            leftButtonText={EDIT_PAGE_MODAL[type].leftButtonText}
            rightButtonText={EDIT_PAGE_MODAL[type].rightButtonText}
            onClick={EDIT_PAGE_MODAL[type].onClick}
          />
        </Modal>
      )}
      <div className={className}>{INVITED_CARD[type]}</div>
    </>
  )
}

export default InvitedListCard
