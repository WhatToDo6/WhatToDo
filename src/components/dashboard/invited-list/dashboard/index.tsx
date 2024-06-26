import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'

import { fetchGetInvitedDashboardList } from '@/pages/api/invitations'
import magnifyingGlassIcon from '@/public/icons/magnifying-glass-icon.svg'
import emptyBoardImg from '@/public/images/empty-board-img.png'
import { DashboardsContext } from '@/src/context/dashboards'
import { useInputSearch } from '@/src/hooks/useInputSearch'
import useIntersectionObserver from '@/src/hooks/useInterSectionObserver'
import { InvitedListDashboardType } from '@/src/types/mydashboard'

import S from './InviteListDashboard.module.scss'
import InvitedListCard from '../card'

function InviteListDashboard() {
  const { currPage, updateData } = useContext(DashboardsContext)
  const observeRef = useRef<HTMLDivElement>(null)
  const [cursorId, setCursorId] = useState(0)
  const { observe, isScrolled } = useIntersectionObserver()
  const [myInvitedListData, setMyInvitedListData] = useState<
    InvitedListDashboardType[]
  >([])
  const { searchWord, handleWordChange, searchedData } =
    useInputSearch(myInvitedListData)

  const contentsClassName = `${S.contents} ${
    myInvitedListData.length ? S.withInviteData : S.withoutInviteData
  }`

  const handleChange = (id: number) => {
    setMyInvitedListData((prev) => prev.filter((data) => data.id !== id))
    updateData(currPage)
  }

  const getInvitedListDashbaord = async (firstFetch: boolean = false) => {
    const path = `/invitations?size=6${firstFetch ? '' : `&cursorId=${cursorId}`}`
    try {
      const { invitations, cursorId } = await fetchGetInvitedDashboardList(path)
      setMyInvitedListData((prev) =>
        firstFetch ? invitations : [...prev, ...invitations],
      )
      setCursorId(cursorId)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getInvitedListDashbaord(true)
  }, [])

  useEffect(() => {
    if (myInvitedListData.length >= 6 && observeRef.current) {
      observe(observeRef.current)
    }
  }, [observe])

  useEffect(() => {
    if (isScrolled && cursorId) {
      getInvitedListDashbaord()
    }
  }, [isScrolled])

  if (!myInvitedListData.length) {
    return (
      <div className={S.container}>
        <div className={S.title}>초대받은 대시보드</div>
        <div className={contentsClassName}>
          <div className={S.imgBox}>
            <Image fill priority src={emptyBoardImg} alt="emptyBoardImg" />
          </div>
          <span>아직 초대받은 대시보드가 없어요</span>
        </div>
      </div>
    )
  }

  return (
    <div className={S.container}>
      <div className={S.title}>초대받은 대시보드</div>
      <div className={S.inputBox}>
        <Image
          width={24}
          height={24}
          className={S.magnifyingGlassImg}
          src={magnifyingGlassIcon}
          alt="magnifyingGlassImg"
        />
        <input
          value={searchWord}
          onChange={handleWordChange}
          placeholder="검색"
        />
      </div>
      <div className={contentsClassName}>
        <div className={S.inviteInfo}>
          <div>이름</div>
          <div>초대자</div>
          <div>수락 여부</div>
        </div>
        {searchedData.map((inviteList) => (
          <InvitedListCard
            type="dashboard"
            key={inviteList.id}
            id={inviteList.id}
            title={inviteList.dashboard.title}
            nickname={inviteList.inviter.nickname}
            handleChange={handleChange}
          />
        ))}
        {!searchWord && <div ref={observeRef} />}
      </div>
    </div>
  )
}

export default InviteListDashboard
