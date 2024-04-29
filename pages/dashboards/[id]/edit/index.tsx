import { GetStaticPropsContext } from 'next'

import { useRouter } from 'next/router'
import { useState } from 'react'

import { fetchDeleteDashboard } from '@/pages/api/dashboards'
import BackButton from '@/src/components/common/back-button/BackButton'
import Layout from '@/src/components/common/layout'
import Modal from '@/src/components/common/modal'
import ModalConfirm from '@/src/components/common/modal/modal-confirm'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import DashboardEditor from '@/src/components/dashboard/editor'
import InviteListEmail from '@/src/components/dashboard/invited-list/email'
import InviteListMember from '@/src/components/dashboard/invited-list/member'

import S from './DashboardIdEdit.module.scss'

export async function getServerSideProps(context: GetStaticPropsContext) {
  const id = context.params && context.params['id']

  if (!id)
    return {
      notFound: true,
    }

  return {
    props: {
      id,
    },
  }
}

interface DashboardIdEditProps {
  id: number
}

const DashboardIdEdit = ({ id }: DashboardIdEditProps) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const deleteDashboard = async () => {
    try {
      await fetchDeleteDashboard(id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleButtonClick = () => {
    deleteDashboard()
    router.push('/mydashboard')
  }

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <ModalConfirm
            content="대시보드를 삭제하시겠습니까?"
            leftButtonText="취소"
            rightButtonText="삭제"
            onClick={handleButtonClick}
          />
        </Modal>
      )}
      <Layout>
        <div className={S.container}>
          <BackButton />
          <DashboardEditor dashboardId={id} />
          <InviteListMember />
          <InviteListEmail dashboardId={id} />
          <div className={S.buttonBox}>
            <DashboardButton type="deleteDashboard" onClick={handleClick} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default DashboardIdEdit
