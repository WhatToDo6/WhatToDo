import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { fetchPostMakeDashboard } from '@/pages/api/dashboards'
import { DashboardsContext } from '@/src/context/dashboards'
import { DashboardEditMakeParamType } from '@/src/types/mydashboard'

import S from './buttonContainer.module.scss'
import Modal from '../../common/modal'
import ModalNewDash from '../../common/modal/modal-newdash'
import DashboardButton from '../dashboard-button'
import PagenationButton from '../pagenation-button'

function DashboardButtonContainer() {
  const router = useRouter()

  const { pageData, currPage, lastPage, onClickPrevPage, onClickNextPage } =
    useContext(DashboardsContext)

  const handleClickButton = (id: number) => {
    router.push(`/dashboards/${id}`)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClick = () => {
    setIsModalOpen(true)
  }

  const makeNewDashboard = async (data: DashboardEditMakeParamType) => {
    try {
      const dashboard = await fetchPostMakeDashboard(data)
      const { id } = dashboard
      router.push(`/dashboards/${id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalNewDash onSubmit={makeNewDashboard} />
        </Modal>
      )}
      <div className={S.container}>
        <DashboardButton type="addDashboard" onClick={handleModalClick} />
        {pageData.map((dashboard) => (
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
