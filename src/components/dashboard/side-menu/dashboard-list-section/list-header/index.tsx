import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { fetchPostMakeDashboard } from '@/pages/api/dashboards'
import Modal from '@/src/components/common/modal'
import ModalNewDash from '@/src/components/common/modal/modal-newdash'
import { DashboardEditMakeParamType } from '@/src/types/mydashboard'

import S from './ListHeader.module.scss'
import { ADD_BOX } from '../../constants'

const ListHeader = () => {
  const router = useRouter()
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
      <header className={S.wrapper}>
        <h2 className={S.title}>Dash Boards</h2>
        <Image
          className={S['add-button']}
          src={ADD_BOX}
          width={20}
          height={20}
          alt="대시보드 생성 버튼"
          onClick={handleModalClick}
        />
      </header>
    </>
  )
}

export default ListHeader
