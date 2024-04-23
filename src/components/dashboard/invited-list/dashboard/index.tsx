import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import AXIOS from '@/lib/axios'
import magnifyingGlassIcon from '@/public/icons/magnifying-glass-icon.svg'
import emptyBoardImg from '@/public/images/empty-board-img.png'
import { useInputSearch } from '@/src/hooks/useInputSearch'
import useIntersectionObserver from '@/src/hooks/useInterSectionObserver'
import { InvitedListDashboardType } from '@/src/types/mydashboard'

import S from './InviteListDashboard.module.scss'
import InvitedListCard from '../card'

interface InviteListDashboardProps {
  updateData: () => void
}

function InviteListDashboard({ updateData }: InviteListDashboardProps) {
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
    updateData()
  }

  const getInvitedListDashbaord = async (firstFetch: boolean = false) => {
    const token = localStorage.getItem('accessToken')
    const path = `/invitations?size=6${firstFetch ? '' : `&cursorId=${cursorId}`}`
    try {
      const response = await AXIOS.get(path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const {
        data: { invitations, cursorId },
      } = response
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
          <Image
            width={100}
            height={100}
            priority
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
        <input
          value={searchWord}
          onChange={handleWordChange}
          placeholder="검색"
        />
      </div>
      <div className={contentsClassName}>
        <div className={S.invite_info}>
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
