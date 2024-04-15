import DashboardList from './DashboardList'
import S from './DashboardListSection.module.scss'
import ListHeader from './ListHeader/ListHeader'

const DashboardListSection = () => {
  return (
    <div className={S.container}>
      <ListHeader />
      <div>
        <DashboardList />
        <DashboardList />
        <DashboardList />
        <DashboardList />
      </div>
    </div>
  )
}

export default DashboardListSection
