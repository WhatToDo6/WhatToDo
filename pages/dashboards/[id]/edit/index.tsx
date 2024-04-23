import { GetStaticPropsContext } from 'next'

import { useRouter } from 'next/router'

import AXIOS from '@/lib/axios'
import BackButton from '@/src/components/common/back-button/BackButton'
import Layout from '@/src/components/common/layout'
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

  const deleteDashboard = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      AXIOS.delete(`/dashboards/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleButtonClick = () => {
    deleteDashboard()
    router.push('/mydashboard')
  }

  return (
    <Layout>
      <div className={S.container}>
        <BackButton />
        <DashboardEditor dashboardId={id} />
        <InviteListEmail dashboardId={id} />
        <InviteListMember dashboardId={id} />
        <div className={S.buttonBox}>
          <DashboardButton type="deleteDashboard" onClick={handleButtonClick} />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardIdEdit
