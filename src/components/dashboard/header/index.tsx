import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useMemo, useContext } from 'react'

import { fetchPostInviteDashboard } from '@/pages/api/dashboards'
import addBoxIcon from '@/public/icons/add-box-icon.svg'
import barIcon from '@/public/icons/bar.svg'
import crownIcon from '@/public/icons/crown-icon.svg'
import settingIcon from '@/public/icons/setting-icon.svg'
import tempCircle1 from '@/public/icons/temp-circle-1.svg'
import tempCircle2 from '@/public/icons/temp-circle-2.svg'
import tempCircle3 from '@/public/icons/temp-circle-3.svg'
import tempCircle4 from '@/public/icons/temp-circle-4.svg'
import tempCircle5 from '@/public/icons/temp-circle-5.svg'
import { DashboardsContext } from '@/src/context/dashboards'
import { MembersContext } from '@/src/context/members'
import { useUser } from '@/src/context/users'
import { InviteDashboardParamType } from '@/src/types/mydashboard'

import S from './DashboardHeader.module.scss'
import ManagerProfile from '../../common/manager-profile'
import Modal from '../../common/modal'
import ModalDashBoard from '../../common/modal/modal-dashboard'

const EMPTY_IMG = [
  tempCircle1,
  tempCircle2,
  tempCircle3,
  tempCircle4,
  tempCircle5,
]

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
  const visibleMemberNum = 4

  const {
    query: { id },
  } = useRouter()
  const dashboardId = id && +id
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const InviteDashboard = async (data: InviteDashboardParamType) => {
    try {
      if (dashboardId) await fetchPostInviteDashboard(data, +dashboardId)
    } catch (err) {
      console.error(err)
    }
  }

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
      <div className={S.container}>
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
              .filter((_, idx) => idx < visibleMemberNum)
              .map((member, idx) => (
                <div key={member.id} className={S.memberImgDiv}>
                  <Image
                    className={S.memberImg}
                    fill
                    key={member.id}
                    src={
                      member.profileImageUrl
                        ? member.profileImageUrl
                        : EMPTY_IMG[idx]
                    }
                    alt={`${member.nickname}의 이미지`}
                  />
                </div>
              ))}
            {headerMembers.length > visibleMemberNum && (
              <div className={S.overImg}>
                <span>+{+headerMembers.length - visibleMemberNum}</span>
              </div>
            )}
          </div>
          <Image width={0} height={38} src={barIcon} alt="bar" />
          <ManagerProfile
            profileImageUrl={userData.profileImageUrl}
            nickname={userData.nickname}
            type="dashboardHeader"
          />
        </div>
      </div>
    </>
  )
}

export default DashboardHeader
