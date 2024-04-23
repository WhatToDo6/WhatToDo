import Layout from '@/src/components/common/layout'
import DashboardButtonContainer from '@/src/components/dashboard/button-container'
import InviteListDashboard from '@/src/components/dashboard/invited-list/dashboard'
import { usePagenation } from '@/src/hooks/usePagenation'
import { DashboardType } from '@/src/types/mydashboard'

import S from './MyDashboard.module.scss'

const MyDashboard = () => {
  const {
    pageData,
    currPage,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    updateData,
  } = usePagenation<DashboardType>(5, 'dashboard')

  return (
    <Layout>
      <div className={S.container}>
        <DashboardButtonContainer
          dashboards={pageData}
          currPage={currPage}
          lastPage={lastPage}
          onClickPrevPage={onClickPrevPage}
          onClickNextPage={onClickNextPage}
        />
        <div className={S.invitedDashboard}>
          <InviteListDashboard updateData={() => updateData(currPage)} />
        </div>
      </div>
    </Layout>
  )
}

export default MyDashboard
