import DashboardButton from '@/src/components/dashboard/dashboard-button'
import DashboardHeader from '@/src/components/dashboard/header'
import InvitedDashboard from '@/src/components/dashboard/invited-list'

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

function test() {
  return (
    <div style={{ backgroundColor: 'grey' }}>
      <div style={{ width: '1000px' }}>
        <DashboardButton type="add" />
      </div>
      <div style={{ width: '1000px' }}>
        <DashboardButton type="addColumn" />
      </div>
      <DashboardButton type="addDashboard" />
      <DashboardButton type="moveDashboard" />
      <DashboardButton type="deleteDashboard" dashboard={MOCK_BTN} />
    </div>
  )
}
export default test
