import Image from 'next/image'

import magnifyingGlassIcon from '@/public/icons/magnifying-glass-icon.svg'
import emptyBoardImg from '@/public/images/empty-board-img.png'

import InvitedCard from './invite-card'
import S from './InvitedDashboard.module.scss'

type MockData = {
  [key: string]: string
}

interface Props {
  inviteData?: MockData[]
}

function InvitedDashboard({ inviteData }: Props) {
  const contentsClassName = `${S.contents} ${
    inviteData ? S.withInviteData : S.withoutInviteData
  }`

  if (!inviteData) {
    return (
      <div className={S.container}>
        <div className={S.title}>초대받은 대시보드</div>
        <div className={contentsClassName}>
          <Image
            width={100}
            height={100}
            src={emptyBoardImg}
            alt="emptyBoardImg"
          />
          <span>아직 초대받은 대시보드가 없어요</span>
        </div>
      </div>
    )
  }

  return (
    <div className={S.container}>
      <div className={S.title}>초대받은 대시보드</div>
      <div className={S.input_box}>
        <Image
          width={24}
          height={24}
          className={S.magnifyingGlassImg}
          src={magnifyingGlassIcon}
          alt="magnifyingGlassImg"
        />
        <input placeholder="검색" />
      </div>
      <div className={contentsClassName}>
        <div className={S.invite_info}>
          <div>이름</div>
          <div>초대자</div>
          <div>수락 여부</div>
        </div>
        {inviteData.map((invite) => (
          <InvitedCard
            key={invite.name}
            name={invite.name}
            person={invite.person}
          />
        ))}
      </div>
    </div>
  )
}

export default InvitedDashboard
