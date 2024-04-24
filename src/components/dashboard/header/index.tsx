import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'

import {
  fetchGetDashboardDetail,
  fetchPostInviteDashboard,
} from '@/pages/api/dashboards'
import { fetchGetDashboardMemberList } from '@/pages/api/members'
import addBoxIcon from '@/public/icons/add-box-icon.svg'
import barIcon from '@/public/icons/bar.svg'
import crownIcon from '@/public/icons/crown-icon.svg'
import settingIcon from '@/public/icons/setting-icon.svg'
import tempCircle1 from '@/public/icons/temp-circle-1.svg'
import tempCircle2 from '@/public/icons/temp-circle-2.svg'
import tempCircle3 from '@/public/icons/temp-circle-3.svg'
import tempCircle4 from '@/public/icons/temp-circle-4.svg'
import tempCircle5 from '@/public/icons/temp-circle-5.svg'
import { useUser } from '@/src/context/users'
import {
  InvitedMemberType,
  DashboardType,
  InviteDashboardParamType,
} from '@/src/types/mydashboard'

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
  const [dashboardMembers, setDashboardMembers] = useState<InvitedMemberType[]>(
    [],
  )
  const [dashboardData, setDashboardData] = useState<DashboardType>()
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

  const getMembersData = async (dashboardId: number) => {
    try {
      const response = await fetchGetDashboardMemberList<InvitedMemberType>(
        1,
        dashboardId,
        20,
      )
      const { data: members } = response
      setDashboardMembers(members)
    } catch (err) {
      console.error(err)
    }
  }

  const getDashboardData = async (dashboardId: number) => {
    try {
      const dashboard = await fetchGetDashboardDetail(dashboardId)
      setDashboardData(dashboard)
    } catch (err) {
      console.error(err)
    }
  }

  const InviteDashboard = async (data: InviteDashboardParamType) => {
    try {
      if (dashboardId) await fetchPostInviteDashboard(data, +dashboardId)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (dashboardId) {
      getMembersData(dashboardId)
      getDashboardData(dashboardId)
    }
  }, [dashboardId])

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
        {dashboardData && (
          <div className={S.dashboardTitle}>
            <p>{dashboardData.title}</p>
            {dashboardData.createdByMe && (
              <Image width={20} height={16} src={crownIcon} alt="왕관" />
            )}
          </div>
        )}
        <div className={S.rightBox}>
          {dashboardData?.createdByMe && (
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
            {dashboardMembers
              .filter((_, idx) => idx < 4)
              .map((member, idx) => (
                <Image
                  className={`${S.memberImg}`}
                  width={38}
                  height={38}
                  key={member.id}
                  src={
                    member.profileImageUrl
                      ? member.profileImageUrl
                      : EMPTY_IMG[idx]
                  }
                  alt={`${member.nickname}의 이미지`}
                />
              ))}
            {dashboardMembers.length > 4 && (
              <div className={S.overImg}>
                <span>+{+dashboardMembers.length - 4}</span>
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
