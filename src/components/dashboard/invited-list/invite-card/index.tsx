import BorderButton from '@/src/components/common/button/border'
import OptionButton from '@/src/components/common/button/option'

import S from './InviteCard.module.scss'

type InvitedListType = 'dashboard' | 'member' | 'email'

interface InvitedCardProps {
  name: string
  person: string
  type: InvitedListType
}

function isTypeMemberOrEmail(
  type: InvitedListType,
): type is 'member' | 'email' {
  return type === 'member' || type === 'email'
}

function InvitedCard({ name, person, type }: InvitedCardProps) {
  const className = `${S.container} ${isTypeMemberOrEmail(type) ? S.inEdit : ''}`

  const INVITED_CARD = {
    dashboard: (
      <>
        <div>{name}</div>
        <div>{person}</div>
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
        <div>{name}</div>
        <BorderButton size="small" color="white">
          삭제
        </BorderButton>
      </>
    ),
    email: (
      <>
        <div>{name}</div>
        <BorderButton size="small" color="white">
          취소
        </BorderButton>
      </>
    ),
  }

  return <div className={className}>{INVITED_CARD[type]}</div>
}

export default InvitedCard
