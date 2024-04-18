import Image from 'next/image'

import addBoxIcon from '@/public/icons/add-box-icon-white.svg'
import BorderButton from '@/src/components/common/button/border'
import { usePagenation } from '@/src/hooks/usePagenation'

import S from './InviteListEmail.module.scss'
import PagenationButton from '../../pagenation-button'
import InvitedListCard from '../card'

type MockData = {
  [key: string]: string
}

interface InviteListEmailProps {
  inviteData: MockData[]
  type: 'email'
}

function InviteListEmail({ inviteData, type }: InviteListEmailProps) {
  const { currPage, lastPage, currPageData, onClickPrevPage, onClickNextPage } =
    usePagenation(inviteData, 5)

  return (
    <div className={S.container}>
      <div className={S.headerBox}>
        <p className={S.title}>초대내역</p>
        <PagenationButton
          currPage={currPage}
          lastPage={lastPage}
          onClickLeft={onClickPrevPage}
          onClickRight={onClickNextPage}
        />
        <div className={S.borderButton}>
          <BorderButton size="extra" color="purple">
            <div className={S.btnContents}>
              <Image width={16} height={16} src={addBoxIcon} alt="초대" />
              <p>초대하기</p>
            </div>
          </BorderButton>
        </div>
      </div>
      <div className={S.tag}>이메일</div>
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

export default InviteListEmail
