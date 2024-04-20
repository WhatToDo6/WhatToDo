import { DashboardType } from '@/src/types/mydashboard'

import S from './buttonContainer.module.scss'
import DashboardButton from '../dashboard-button'
import PagenationButton from '../pagenation-button'

interface DashboardButtonContainerProps {
  dashboards: DashboardType[]
  currPage: number
  lastPage: number
  onClickPrevPage: () => void
  onClickNextPage: () => void
}

function DashboardButtonContainer({
  dashboards,
  currPage,
  lastPage,
  onClickPrevPage,
  onClickNextPage,
}: DashboardButtonContainerProps) {
  return (
    <div className={S.container}>
      <DashboardButton type="addDashboard" />
      {dashboards.map((dashboard) => (
        <DashboardButton
          key={dashboard.id}
          id={dashboard.id}
          color={dashboard.color}
          type="moveDashboard"
          dashboard={dashboard}
          createdByMe={dashboard.createdByMe}
        />
      ))}
      <PagenationButton
        currPage={currPage}
        lastPage={lastPage}
        onClickLeft={onClickPrevPage}
        onClickRight={onClickNextPage}
      />
    </div>
  )
}

export default DashboardButtonContainer
