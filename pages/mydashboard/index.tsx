import Layout from '@/src/components/common/layout'
import DashboardButtonContainer from '@/src/components/dashboard/button-container'
import InviteListDashboard from '@/src/components/dashboard/invited-list/dashboard'

import S from './MyDashboard.module.scss'

const MyDashboard = () => {
  return (
    <Layout>
      <div className={S.container}>
        <DashboardButtonContainer />
        <div className={S.invitedDashboard}>
          <InviteListDashboard />
        </div>
      </div>
    </Layout>
  )
}

export default MyDashboard
