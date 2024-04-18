import Layout from '@/src/components/common/layout'
import Column from '@/src/components/dashboard/column'
import AddColumn from '@/src/components/dashboard/column/add-column'
import ColumnLayout from '@/src/components/dashboard/column/column-layout'

import S from './DashboardId.module.scss'

const DashboardIdPage = () => {
  return (
    <Layout>
      <ColumnLayout>
        <Column />
        <Column />
        <Column />
        <div className={S.addWrapper}>
          <AddColumn />
        </div>
      </ColumnLayout>
    </Layout>
  )
}

export default DashboardIdPage
