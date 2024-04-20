import { usePagenation } from '@/src/hooks/usePagenation'
import { InvitedMemberType } from '@/src/types/mydashboard'

import S from './InviteListMember.module.scss'
import PagenationButton from '../../pagenation-button'
import InvitedListCard from '../card'

interface InviteListMemberProps {
  dashboardId: number
}
//<InviteListMember type="member" dashboardId={dashboardId} />
function InviteListMember({ dashboardId }: InviteListMemberProps) {
  const {
    currPage,
    pageData,
    setPageData,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
  } = usePagenation<InvitedMemberType>(4, 'member', dashboardId)

  const handleChange = (id: number) => {
    setPageData((prev) => prev.filter((prev) => prev.id !== id))
  }

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
          type="member"
          key={data.id}
          id={data.id}
          nickname={data.nickname}
          userId={data.userId}
          profileImageUrl={data.profileImageUrl}
          handleChange={handleChange}
        />
      ))}
    </div>
  )
}

export default InviteListMember
