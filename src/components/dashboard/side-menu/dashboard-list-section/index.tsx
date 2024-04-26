import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'

import DashboardList from '@/src/components/dashboard/side-menu/dashboard-list-section/dashboard-list'
import ListHeader from '@/src/components/dashboard/side-menu/dashboard-list-section/list-header'
import { DashboardsContext } from '@/src/context/dashboards'
import { MembersContext } from '@/src/context/members'

import S from './DashboardListSection.module.scss'

const DashboardListSection = () => {
  const router = useRouter()
  const [selectedDashboard, setSelectedDashboard] = useState(0)
  //TODO: 페이지네이션
  const { sideMenuDashboards, getSideMenuDashboards } =
    useContext(DashboardsContext)

  const { getHeaderMembersData } = useContext(MembersContext)

  const handleChange = (id: number) => {
    setSelectedDashboard(id)
  }

  const handleSelect = useCallback(async (id: number) => {
    setSelectedDashboard(id)
    await getHeaderMembersData(id)
    router.push(`/dashboards/${id}`)
  }, [])

  return (
    <div className={S.container}>
      <ListHeader />
      <div className={S.dashboardWrapper}>
        {sideMenuDashboards.map((dashboard) => (
          <DashboardList
            key={dashboard.id}
            {...dashboard}
            selected={selectedDashboard}
            onSelect={() => handleSelect(dashboard.id)}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardListSection
