import { usePagenation } from '@/src/hooks/usePagenation'
import { InvitedMemberType } from '@/src/types/mydashboard'

import S from './InviteListMember.module.scss'
import PagenationButton from '../../pagenation-button'
import InvitedListCard from '../card'

interface InviteListMemberProps {
  type: 'member'
  dashboardId: number
}
//<InviteListMember type="member" dashboardId={dashboardId} />
function InviteListMember({ type, dashboardId }: InviteListMemberProps) {
  const { currPage, pageData, lastPage, onClickPrevPage, onClickNextPage } =
    usePagenation<InvitedMemberType>(4, 'member', dashboardId)

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
      {pageData.map((data) => (
        <InvitedListCard
          type={type}
          key={data.id}
          nickname={data.nickname}
          userId={data.userId}
          profileImageUrl={data.profileImageUrl}
        />
      ))}
    </div>
  )
}

export default InviteListMember
