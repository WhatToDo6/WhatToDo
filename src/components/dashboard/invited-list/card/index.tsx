import BorderButton from '@/src/components/common/button/border'
import OptionButton from '@/src/components/common/button/option'

import S from './InviteCard.module.scss'

type InvitedListType = 'dashboard' | 'member' | 'email'

interface InvitedCardProps {
  name: string
  person: string
  type: InvitedListType
}

function isDashboardType(type: InvitedListType): type is 'dashboard' {
  return type === 'dashboard'
}

function InvitedListCard({ name, person, type }: InvitedCardProps) {
  const className = `${S.container} ${isDashboardType(type) ? S.dashboard : ''}`

  const INVITED_CARD = {
    dashboard: (
      <>
        <p>{name}</p>
        <p>{person}</p>
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
        <p>{name}</p>
        <BorderButton size="small" color="white">
          삭제
        </BorderButton>
      </>
    ),
    email: (
      <>
        <p>{name}</p>
        <BorderButton size="small" color="white">
          취소
        </BorderButton>
      </>
    ),
  }

  return <div className={className}>{INVITED_CARD[type]}</div>
}

export default InvitedListCard
