import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import AXIOS from '@/lib/axios'
import addBoxIcon from '@/public/icons/add-box-icon.svg'
import barIcon from '@/public/icons/bar.svg'
import settingIcon from '@/public/icons/setting-icon.svg'
import tempCircle1 from '@/public/icons/temp-circle-1.svg'
import tempCircle2 from '@/public/icons/temp-circle-2.svg'
import tempCircle3 from '@/public/icons/temp-circle-3.svg'
import tempCircle4 from '@/public/icons/temp-circle-4.svg'
import tempCircle5 from '@/public/icons/temp-circle-5.svg'
import { UserType } from '@/src/types/mydashboard'

import S from './DashboardHeader.module.scss'
import ManagerProfile from '../../common/manager-profile'

const MEMBERS = [
  {
    id: 0,
    name: 'choi',
    profileImageUrl: tempCircle1,
  },
  {
    id: 2,
    name: 'choi',
    profileImageUrl: tempCircle2,
  },
  {
    id: 3,
    name: 'choi',
    profileImageUrl: tempCircle3,
  },
  {
    id: 4,
    name: 'choi',
    profileImageUrl: tempCircle4,
  },
  {
    id: 5,
    name: 'choi',
    profileImageUrl: tempCircle5,
  },
  {
    id: 6,
    name: 'choi',
    profileImageUrl: tempCircle5,
  },
  {
    id: 7,
    name: 'choi',
    profileImageUrl: tempCircle5,
  },
]

// TODO: 타입좁히기
// type PathName = '/mydashboard' | '/mypage' | '/dashboard/[id]'

const TITLE: Record<string, string> = {
  '/mydashboard': '내 대시보드',
  '/mypage': '계정관리',
  '/dashboards/[id]': '나',
}

interface DashboardHeaderProps {
  pathname: string
}

function DashboardHeader({ pathname }: DashboardHeaderProps) {
  const [myUserData, setMyUserData] = useState<UserType>()
  const {
    query: { id },
  } = useRouter()
  const router = useRouter()

  const BUTTONS = [
    {
      tag: 'settingIcon',
      className: `${S.btn} ${S.settingBtn}`,
      size: 22,
      src: settingIcon,
      text: '관리',
      onClick: () => router.push(`/dashboard/${id}/edit`),
    },
    {
      tag: 'addBoxIcon',
      className: `${S.btn} ${S.inviteBtn}`,
      size: 20,
      src: addBoxIcon,
      text: '초대하기',
      onClick: () => {}, //생성 모달
    },
  ]

  const getUserData = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await AXIOS.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { data } = response
      setMyUserData(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  // TODO: 로딩 구현
  if (!myUserData)
    return (
      <div className={S.container}>
        <div className={S.title}>{TITLE[pathname]}</div>
      </div>
    )

  return (
    <div className={S.container}>
      <div className={S.title}>{TITLE[pathname]}</div>
      <div className={S.rightBox}>
        {pathname.includes('id') && (
          <>
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
            <div className={S.memberImgBox}>
              {MEMBERS.filter((_, idx) => idx < 4).map((member) => (
                <Image
                  className={`${S.memberImg}`}
                  width={38}
                  height={38}
                  key={member.id}
                  src={member.profileImageUrl}
                  alt={`${member.name}의 이미지`}
                />
              ))}
              {MEMBERS.length > 4 && (
                <div className={S.overImg}>
                  <span>+{+MEMBERS.length - 4}</span>
                </div>
              )}
            </div>
            <Image width={0} height={38} src={barIcon} alt="bar" />
          </>
        )}
        <ManagerProfile
          profileImageUrl={myUserData.profileImageUrl}
          nickname={myUserData.nickname}
          type="dashboardHeader"
        />
      </div>
    </div>
  )
}

export default DashboardHeader
