import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import magnifyingGlassIcon from '@/public/icons/magnifying-glass-icon.svg'
import emptyBoardImg from '@/public/images/empty-board-img.png'
import { useInputSearch } from '@/src/hooks/useInputSearch'
import useIntersectionObserver from '@/src/hooks/useInterSectionObserver'

import S from './InviteListDashboard.module.scss'
import InvitedCard from '../invite-card'

type MockData = {
  [key: string]: string
}

interface InviteListDashboardProps {
  inviteData: MockData[]
  type: 'dashboard'
}

const MOCK_DATA2: MockData[] = [
  { name: '유닛I', person: '안귀영' },
  { name: '유닛J', person: '장혁' },
  { name: '유닛K', person: '강나무' },
  { name: '유닛L', person: '안귀영' },
  { name: '유닛M', person: '장혁' },
  { name: '유닛N', person: '강나무' },
  { name: '유닛O', person: '강나무' },
  { name: '유닛P', person: '강나무' },
  { name: '최원석', person: '강나무' },
]

function InviteListDashboard({ inviteData, type }: InviteListDashboardProps) {
  const observeRef = useRef<HTMLDivElement>(null)
  const [myInviteData, setMyInviteData] = useState<MockData[]>(inviteData)
  const [observe, isScrolled] = useIntersectionObserver()
  const [searchWord, handleWordChange, searchedData] =
    useInputSearch(myInviteData)

  const contentsClassName = `${S.contents} ${
    inviteData ? S.withInviteData : S.withoutInviteData
  }`

  useEffect(() => {
    if (inviteData.length >= 6 && observeRef.current) {
      observe(observeRef.current)
    }
  }, [observe])

  useEffect(() => {
    if (isScrolled) {
      setMyInviteData((prev) => [...prev, ...MOCK_DATA2])
    }
  }, [isScrolled])

  if (!inviteData) {
    return (
      <div className={S.container}>
        <div className={S.title}>초대받은 대시보드</div>
        <div className={contentsClassName}>
          <Image
            width={100}
            height={100}
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
        {searchedData &&
          searchedData.map((invite) => (
            <InvitedCard
              type={type}
              key={invite.name}
              name={invite.name}
              person={invite.person}
            />
          ))}
        {!searchWord && <div ref={observeRef} />}
      </div>
    </div>
  )
}

export default InviteListDashboard
