import { useCallback, useState } from 'react'

import DashboardList from '@/src/components/dashboard/side-menu/dashboard-list-section/dashboard-list'
import ListHeader from '@/src/components/dashboard/side-menu/dashboard-list-section/list-header'

import S from './DashboardListSection.module.scss'

interface MockData {
  title: string
  color: string
}

const mockData: MockData[] = [
  { title: '비브리지', color: '#7AC555' },
  { title: '코드잇', color: '#760DDE' },
  { title: '3분기 계획', color: '#FFA500' },
  { title: '회의록', color: '#76A5EA' },
  { title: '중요 문서함', color: '#E876EA' },
]

const DashboardListSection = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<string>('')

  const handleSelect = useCallback((title: string) => {
    setSelectedDashboard(title)
  }, [])

  return (
    <div className={S.container}>
      <ListHeader />
      <div className={S.dashboardWrapper}>
        {mockData.map((data, idx) => (
          <DashboardList
            key={idx}
            {...data}
            selected={selectedDashboard}
            onSelect={() => handleSelect(data.title)}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardListSection
