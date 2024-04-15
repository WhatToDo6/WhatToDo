import DashboardList from './DashboardList'
import S from './DashboardListSection.module.scss'
import ListHeader from './ListHeader/ListHeader'

interface MockData {
  title: string
  isSelected: boolean
}

const mockData: MockData[] = [
  { title: '비브리지', isSelected: false },
  { title: '코드잇', isSelected: false },
  { title: '3분기 계획', isSelected: false },
  { title: '회의록', isSelected: false },
  { title: '중요 문서함', isSelected: false },
]

const DashboardListSection = () => {
  return (
    <div className={S.container}>
      <ListHeader />
      <div className={S['dashboard-wrapper']}>
        {mockData.map((data, idx) => (
          <DashboardList key={idx} {...data} />
        ))}
      </div>
    </div>
  )
}

export default DashboardListSection
