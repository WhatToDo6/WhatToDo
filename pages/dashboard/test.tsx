import DashboardButton from '@/src/components/dashboard/dashboard-button'
import DashboardHeader from '@/src/components/dashboard/header'
import InvitedDashboard from '@/src/components/dashboard/invited-list'

const MOCK_DATA = [
  { name: '프로덕트 디자인', person: '손동희' },
  { name: '유닛A', person: '안귀영' },
  { name: '유닛B', person: '장혁' },
  { name: '유닛C', person: '강나무' },
  { name: '유닛D', person: '김자반' },
]

const MOCK_BTN = { name: 'choi' }

function test() {
  return (
    <div>
      <div />
      <DashboardHeader />
      <div style={{ backgroundColor: 'grey' }}>
        <div style={{ width: '332px' }}>
          <DashboardButton />
        </div>
        <br />
        <div style={{ width: '332px' }}>
          <DashboardButton dashboard={MOCK_BTN} />
        </div>
        <br />
        <div style={{ width: '1000px' }}>
          <InvitedDashboard inviteData={MOCK_DATA} />
        </div>
        <br />
        <div style={{ width: '1000px' }}>
          <InvitedDashboard />
        </div>
      </div>
    </div>
  )
}
export default test
