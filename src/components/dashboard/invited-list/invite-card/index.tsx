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
      <div>
        <button>수락</button>
        <button>거절</button>
      </div>
    </div>
  )
}

export default InvitedCard
