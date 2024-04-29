import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import DashboardList from '@/src/components/dashboard/side-menu/dashboard-list-section/dashboard-list'
import ListHeader from '@/src/components/dashboard/side-menu/dashboard-list-section/list-header'
import { DashboardsContext } from '@/src/context/dashboards'
import { MembersContext } from '@/src/context/members'

import S from './DashboardListSection.module.scss'

const DashboardListSection = () => {
  const router = useRouter()
  const [selectedDashboard, setSelectedDashboard] = useState(0)
  const { sideMenuDashboards } = useContext(DashboardsContext)
  const ref = useRef<HTMLDivElement>(null)
  const [isFirstView, setIsFirstView] = useState(true)
  const sideBarHeaderHeightVal = 129

  const { getHeaderMembersData } = useContext(MembersContext)

  const handleChange = (id: number) => {
    setSelectedDashboard(id)
  }

  const handleSelect = useCallback(async (id: number) => {
    setSelectedDashboard(id)
    await getHeaderMembersData(id)
    router.push(`/dashboards/${id}`)
  }, [])

  useEffect(() => {
    const selectedDashboardElement = document.getElementById(
      selectedDashboard.toString(),
    )

    if (selectedDashboardElement && isFirstView) {
      if (ref.current) {
        ref.current.scrollTop =
          selectedDashboardElement.offsetTop - sideBarHeaderHeightVal

        setIsFirstView(false)
      }
    }
  }, [selectedDashboard])

  return (
    <div className={S.container}>
      <ListHeader />
      <div className={S.dashboardScrollBox} ref={ref}>
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
