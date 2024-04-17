import Layout from '@/src/components/common/layout'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import InvitedDashboard from '@/src/components/dashboard/invited-list'

import S from './Dashboard.module.scss'

const MOCK_DATA = [
  { name: '프로덕트 디자인', person: '손동희' },
  { name: '유닛A', person: '안귀영' },
  { name: '유닛B', person: '장혁' },
  { name: '유닛C', person: '강나무' },
  { name: '유닛D', person: '안귀영' },
  { name: '유닛E', person: '장혁' },
  { name: '유닛F', person: '강나무' },
  { name: '유닛G', person: '강나무' },
  { name: '유닛H', person: '강나무' },
]

const MOCK_BTN = { name: 'choi' }

const dashboard = () => {
  return (
    <Layout>
      <div className={S.container}>
        <div>
          <DashboardButton />
          <DashboardButton dashboard={MOCK_BTN} />
        </div>
        <div className={S.invitedDashboard}>
          <InvitedDashboard inviteData={MOCK_DATA} />
        </div>
      </div>
    </Layout>
  )
}

export default dashboard
