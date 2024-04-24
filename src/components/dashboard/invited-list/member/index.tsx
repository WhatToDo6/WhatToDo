import { useContext } from 'react'

import { MembersContext } from '@/src/context/members'

import S from './InviteListMember.module.scss'
import PagenationButton from '../../pagenation-button'
import InvitedListCard from '../card'

function InviteListMember() {
  const {
    currPage,
    pageData,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    handleDelete,
  } = useContext(MembersContext)

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
      {pageData.map((data, idx) => (
        <InvitedListCard
          type="member"
          idx={idx}
          key={data.id}
          id={data.id}
          nickname={data.nickname}
          userId={data.userId}
          profileImageUrl={data.profileImageUrl}
          handleChange={handleDelete}
        />
      ))}
    </div>
  )
}

export default InviteListMember
