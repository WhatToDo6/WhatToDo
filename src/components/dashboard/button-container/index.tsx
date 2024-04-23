import { useRouter } from 'next/router'
import { useState } from 'react'

import { DashboardType } from '@/src/types/mydashboard'

import S from './buttonContainer.module.scss'
import Modal from '../../common/modal'
import ModalNewDash from '../../common/modal/modal-newdash'
import DashboardButton from '../dashboard-button'
import PagenationButton from '../pagenation-button'

interface DashboardButtonContainerProps {
  dashboards: DashboardType[]
  currPage: number
  lastPage: number
  onClickPrevPage: () => void
  onClickNextPage: () => void
}

function DashboardButtonContainer({
  dashboards,
  currPage,
  lastPage,
  onClickPrevPage,
  onClickNextPage,
}: DashboardButtonContainerProps) {
  const router = useRouter()

  const handleClickButton = (id: number) => {
    router.push(`/dashboards/${id}`)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalNewDash onSubmit={() => console.log('hi')} />
        </Modal>
      )}
      <div className={S.container}>
        <DashboardButton type="addDashboard" onClick={handleModalClick} />
        {dashboards.map((dashboard) => (
          <DashboardButton
            key={dashboard.id}
            color={dashboard.color}
            type="moveDashboard"
            createdByMe={dashboard.createdByMe}
            title={dashboard.title}
            onClick={() => handleClickButton(dashboard.id)}
          />
        ))}
      </div>
      <PagenationButton
        currPage={currPage}
        lastPage={lastPage}
        onClickLeft={onClickPrevPage}
        onClickRight={onClickNextPage}
      />
    </>
  )
}

export default DashboardButtonContainer
