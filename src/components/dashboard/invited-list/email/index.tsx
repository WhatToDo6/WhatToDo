import Image from 'next/image'
import { useContext, useState } from 'react'

import { fetchPostInviteDashboard } from '@/pages/api/dashboards'
import addBoxIcon from '@/public/icons/add-box-icon-white.svg'
import BorderButton from '@/src/components/common/button/border'
import Modal from '@/src/components/common/modal'
import ModalDashBoard from '@/src/components/common/modal/modal-dashboard'
import { InviteeEmailContext } from '@/src/context/inviteeEmail'
import { useToast } from '@/src/context/toast'
import { InviteDashboardParamType } from '@/src/types/mydashboard'

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
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    handleDelete,
    handleCreate,
  } = useContext(InviteeEmailContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToast } = useToast()

  const handleModalClick = () => {
    setIsModalOpen(true)
  }

  const InviteDashboard = async (data: InviteDashboardParamType) => {
    try {
      await fetchPostInviteDashboard(data, dashboardId)
      handleCreate()
      addToast('초대가 완료되었습니다.', 'success')
    } catch (err) {
      addToast('유효하지 않은 이메일입니다.', 'error')
      console.error(err)
    }
  }

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
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
            handleChange={handleDelete}
          />
        ))}
      </div>
    </>
  )
}

export default InviteListEmail
