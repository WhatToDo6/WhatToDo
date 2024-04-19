import Layout from '@/src/components/common/layout'
import DashboardButtonContainer from '@/src/components/dashboard/button-container'
import InvitedList from '@/src/components/dashboard/invited-list'

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

const dashboard = () => {
  return (
    <Layout>
      <div className={S.container}>
        <DashboardButtonContainer />
        <div className={S.invitedDashboard}>
          <InvitedList inviteData={MOCK_DATA} type="dashboard" />
        </div>
      </div>
    </Layout>
  )
}

export default dashboard
