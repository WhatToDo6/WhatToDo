import { usePagenation } from '@/src/hooks/usePagenation'

import S from './buttonContainer.module.scss'
import DashboardButton from '../dashboard-button'
import PagenationButton from '../pagenation-button'

const MOCK_DATA = [
  { name: 'first', person: 'first' },
  { name: '0', person: '손동희' },
  { name: '1', person: '손동희' },
  { name: '2', person: '안귀영' },
  { name: '3', person: '장혁' },
  { name: '4', person: '강나무' },
  { name: '5', person: '안귀영' },
  { name: '6', person: '장혁' },
  { name: '7', person: '손동희' },
  { name: '8', person: '안귀영' },
  { name: '9', person: '장혁' },
  { name: '10', person: '강나무' },
  { name: '11', person: '안귀영' },
  { name: '12', person: '장혁' },
  { name: '13', person: '손동희' },
  { name: '14', person: '안귀영' },
  { name: '15', person: '장혁' },
  { name: '16', person: '강나무' },
  { name: '17', person: '안귀영' },
]

function DashboardButtonContainer() {
  const { currPage, lastPage, currPageData, onClickPrevPage, onClickNextPage } =
    usePagenation(MOCK_DATA, 6)

  return (
    <div className={S.container}>
      {currPageData.map((data) => (
        <DashboardButton
          key={data.name}
          type={data.name === 'first' ? 'addDashboard' : 'moveDashboard'}
          dashboard={data}
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
