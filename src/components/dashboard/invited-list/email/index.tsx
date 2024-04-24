import Image from 'next/image'
import { useState } from 'react'

import { fetchPostInviteDashboard } from '@/pages/api/dashboards'
import addBoxIcon from '@/public/icons/add-box-icon-white.svg'
import BorderButton from '@/src/components/common/button/border'
import Modal from '@/src/components/common/modal'
import ModalDashBoard from '@/src/components/common/modal/modal-dashboard'
import { usePagenation } from '@/src/hooks/usePagenation'
import {
  InviteDashboardParamType,
  InvitedListEmailType,
} from '@/src/types/mydashboard'

import S from './InviteListEmail.module.scss'
import PagenationButton from '../../pagenation-button'
import InvitedListCard from '../card'

interface InviteListEmailProps {
  dashboardId: number
}

function InviteListEmail({ dashboardId }: InviteListEmailProps) {
  const {
    currPage,
    pageData,
    setPageData,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
  } = usePagenation<InvitedListEmailType>(5, 'email', dashboardId)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClick = () => {
    setIsModalOpen(true)
  }

  const handleChange = (id: number) => {
    setPageData((prev) => prev.filter((prev) => prev.id !== id))
  }

  const InviteDashboard = async (data: InviteDashboardParamType) => {
    try {
      await fetchPostInviteDashboard(data, dashboardId)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalDashBoard
            title="초대하기"
            inputTitle="이메일"
            inputType="email"
            placeholder="이메일"
            leftButtonText="취소"
            rightButtonText="초대"
            onSubmit={InviteDashboard}
          />
        </Modal>
      )}
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
            <BorderButton
              size="extra"
              color="purple"
              onClick={handleModalClick}
            >
              <div className={S.btnContents}>
                <Image width={16} height={16} src={addBoxIcon} alt="초대" />
                <p>초대하기</p>
              </div>
            </BorderButton>
          </div>
        </div>
        <div className={S.tag}>이메일</div>
        {pageData.map((data) => (
          <InvitedListCard
            type="email"
            key={data.id}
            id={data.id}
            email={data.invitee.email}
            dashboardId={dashboardId}
            handleChange={handleChange}
          />
        ))}
      </div>
    </>
  )
}

export default InviteListEmail
