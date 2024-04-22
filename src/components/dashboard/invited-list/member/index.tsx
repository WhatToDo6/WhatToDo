import { usePagenation } from '@/src/hooks/usePagenation'

import S from './InviteListMember.module.scss'
import PagenationButton from '../../pagenation-button'
import InvitedListCard from '../card'

type MockData = {
  [key: string]: string
}

interface InviteListMemberProps {
  inviteData: MockData[]
  type: 'member'
}

function InviteListMember({ inviteData, type }: InviteListMemberProps) {
  const { currPage, lastPage, currPageData, onClickPrevPage, onClickNextPage } =
    usePagenation(inviteData, 4)

  return (
    <div className={S.container}>
      <div className={S.headerBox}>
        <p className={S.title}>구성원</p>
        <PagenationButton
          currPage={currPage}
          lastPage={lastPage}
          onClickLeft={onClickPrevPage}
          onClickRight={onClickNextPage}
        />
      </div>
      <div className={S.tag}>이름</div>
      {currPageData.map((invite) => (
        <InvitedListCard
          type={type}
          key={invite.name}
          name={invite.name}
          person={invite.person}
        />
      ))}
    </div>
  )
}

export default InviteListMember
