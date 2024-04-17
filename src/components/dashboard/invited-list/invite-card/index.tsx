import OptionButton from '@/src/components/common/button/option'

import S from './InviteCard.module.scss'

interface Props {
  name: string
  person: string
}

function InvitedCard({ name, person }: Props) {
  return (
    <div className={S.container}>
      <div>{name}</div>
      <div>{person}</div>
      <OptionButton
        size="medium"
        leftColor="purple"
        rightColor="white"
        leftText="수락"
        rightText="거절"
      />
    </div>
  )
}

export default InvitedCard
