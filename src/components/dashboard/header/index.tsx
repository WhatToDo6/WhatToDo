import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useMemo, useContext, useEffect } from 'react'

import { fetchPostInviteDashboard } from '@/pages/api/dashboards'
import addBoxIcon from '@/public/icons/add-box-icon.svg'
import barIcon from '@/public/icons/bar.svg'
import crownIcon from '@/public/icons/crown-icon.svg'
import settingIcon from '@/public/icons/setting-icon.svg'
import { DashboardsContext } from '@/src/context/dashboards'
import { InviteeEmailContext } from '@/src/context/inviteeEmail'
import { MembersContext } from '@/src/context/members'
import { useToast } from '@/src/context/toast'
import { useUser } from '@/src/context/users'
import useMobileSizeChange from '@/src/hooks/useMobileSizeChange'
import { InviteDashboardParamType } from '@/src/types/mydashboard'

import S from './DashboardHeader.module.scss'
import ManagerProfile from '../../common/manager-profile'
import Modal from '../../common/modal'
import ModalDashBoard from '../../common/modal/modal-dashboard'
import UserDefaultImg from '../../common/user-default-img'

// TODO: 타입좁히기
// type PathName = '/mydashboard' | '/mypage' | '/dashboard/[id]' /'dashboard/[id]/edit'

const TITLE: Record<string, string> = {
  '/mydashboard': '내 대시보드',
  '/mypage': '계정관리',
}

interface DashboardHeaderProps {
  pathname: string
}

function DashboardHeader({ pathname }: DashboardHeaderProps) {
  const { userData } = useUser()
  const { headerMembers } = useContext(MembersContext)
  const { dashboardDetail } = useContext(DashboardsContext)
  const { handleCreate } = useContext(InviteeEmailContext)
  const { addToast } = useToast()
  const changeableVal = useMobileSizeChange<number>(4, 2)

  const {
    query: { id },
  } = useRouter()

  const dashboardId = typeof id !== 'undefined' ? +id : -1
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const InviteDashboard = async (data: InviteDashboardParamType) => {
    if (dashboardId === -1) return
    try {
      await fetchPostInviteDashboard(data, dashboardId)
      handleCreate()
      addToast('초대가 완료되었습니다.', 'success')
    } catch (err) {
      addToast('유효하지 않은 이메일입니다.', 'error')
      console.error(err)
    }
  }

  const BUTTONS = useMemo(
    () => [
      {
        tag: 'settingIcon',
        className: `${S.btn} ${S.settingBtn}`,
        size: 22,
        src: settingIcon,
        text: '관리',
        onClick: () => router.push(`/dashboards/${dashboardId}/edit`),
      },
      {
        tag: 'addBoxIcon',
        className: `${S.btn} ${S.inviteBtn}`,
        size: 20,
        src: addBoxIcon,
        text: '초대하기',
        onClick: () => setIsModalOpen(true),
      },
    ],
    [dashboardId],
  )

  // TODO: 로딩 구현
  if (!userData)
    return (
      <div className={S.container}>
        <div className={S.title}>{TITLE[pathname]}</div>
      </div>
    )

  if (['/mydashboard', '/mypage'].includes(pathname))
    return (
      <div className={S.container}>
        <div className={S.title}>{TITLE[pathname]}</div>
        <div className={S.rightBox}>
          <ManagerProfile
            profileImageUrl={userData.profileImageUrl}
            userId={userData.id}
            nickname={userData.nickname}
            type="dashboardHeader"
            showPopover={true}
          />
        </div>
      </div>
    )

  return (
    <>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalDashBoard
            title="초대하기"
            inputTitle="이메일"
            inputType="email"
            placeholder="이메일"
            leftButtonText="취소"
            rightButtonText="초대"
            onSubmit={InviteDashboard}
          />
        </Modal>
      )}
      <div className={`${S.container} ${S.idPage}`}>
        {dashboardDetail && (
          <div className={S.dashboardTitle}>
            <p>{dashboardDetail.title}</p>
            {dashboardDetail.createdByMe && (
              <Image width={20} height={16} src={crownIcon} alt="왕관" />
            )}
          </div>
        )}
        <div className={S.rightBox}>
          {dashboardDetail?.createdByMe && (
            <div className={S.btnBox}>
              {BUTTONS.map((btn) => (
                <button
                  key={btn.tag}
                  className={btn.className}
                  onClick={btn.onClick}
                >
                  <Image
                    className={S.btnImg}
                    width={btn.size}
                    height={btn.size}
                    src={btn.src}
                    alt={btn.tag}
                  />
                  <span>{btn.text}</span>
                </button>
              ))}
            </div>
          )}
          <div className={S.memberImgBox}>
            {headerMembers
              .filter((_, idx) => idx < changeableVal)
              .map((member, idx) =>
                member.profileImageUrl ? (
                  <div
                    key={member.id}
                    className={S.memberImgDiv}
                    style={{ zIndex: idx }}
                  >
                    <Image
                      className={S.memberImg}
                      fill
                      key={member.id}
                      src={member.profileImageUrl}
                      alt={`${member.nickname}의 이미지`}
                    />
                  </div>
                ) : (
                  <UserDefaultImg
                    key={member.id}
                    userId={member.userId}
                    zIndex={idx}
                    nickname={member.nickname}
                    type="dashboardHeaderMembers"
                  />
                ),
              )}
            {headerMembers.length > changeableVal && (
              <div className={S.overImg}>
                <span>+{+headerMembers.length - changeableVal}</span>
              </div>
            )}
          </div>
          <Image
            className={S.barImg}
            width={0}
            height={38}
            src={barIcon}
            alt="bar"
          />
          <ManagerProfile
            profileImageUrl={userData.profileImageUrl}
            nickname={userData.nickname}
            type="dashboardHeader"
            userId={userData.id}
            showPopover={true}
          />
        </div>
      </div>
    </>
  )
}

export default DashboardHeader
