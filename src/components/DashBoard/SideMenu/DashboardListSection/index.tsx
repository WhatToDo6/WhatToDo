import DashboardList from './DashboardList'
import S from './DashboardListSection.module.scss'
import ListHeader from './ListHeader/ListHeader'

const DashboardListSection = () => {
  return (
    <div className={S.container}>
      <ListHeader />
      <div className={S['dashboard-wrapper']}>
        <DashboardList />
        <DashboardList />
        <DashboardList />
        <DashboardList />
      </div>
    </div>
  )
}

export default DashboardListSection
