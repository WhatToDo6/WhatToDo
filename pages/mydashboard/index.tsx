import Layout from '@/src/components/common/layout'
import DashboardButtonContainer from '@/src/components/dashboard/button-container'
import InvitedList from '@/src/components/dashboard/invited-list'
import { usePagenationTest } from '@/src/hooks/usePagenationTest'

import S from './MyDashboard.module.scss'

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

const MyDashboard = () => {
  const { dashboards, currPage, lastPage, onClickPrevPage, onClickNextPage } =
    usePagenationTest(5)

  return (
    <Layout>
      <div className={S.container}>
        <DashboardButtonContainer
          dashboards={dashboards}
          currPage={currPage}
          lastPage={lastPage}
          onClickPrevPage={onClickPrevPage}
          onClickNextPage={onClickNextPage}
        />
        <div className={S.invitedDashboard}>
          <InvitedList inviteData={MOCK_DATA} type="dashboard" />
        </div>
      </div>
    </Layout>
  )
}

export default MyDashboard
