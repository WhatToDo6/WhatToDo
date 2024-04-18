import Layout from '@/src/components/common/layout'
import Column from '@/src/components/dashboard/column'
import ColumnLayout from '@/src/components/dashboard/column/column-layout'
import DashboardButton from '@/src/components/dashboard/dashboard-button'

import S from './DashboardId.module.scss'

const DashboardIdPage = () => {
  return (
    <Layout>
      <ColumnLayout>
        <Column />
        <Column />
        <Column />
        <div className={S.addWrapper}>
          <DashboardButton type="addColumn" />
        </div>
      </ColumnLayout>
    </Layout>
  )
}

export default DashboardIdPage
