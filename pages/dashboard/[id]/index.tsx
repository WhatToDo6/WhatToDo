import { useRouter } from 'next/router'

import { getColumns } from '@/pages/api/columns'
import Layout from '@/src/components/common/layout'
import Column from '@/src/components/dashboard/column'
import ColumnLayout from '@/src/components/dashboard/column/column-layout'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import useFetchData from '@/src/hooks/useFetchData'
import { ColumnDataType } from '@/src/types/dashboard.interface'

import S from './DashboardId.module.scss'

const DashboardIdPage = () => {
  const {
    query: { id },
  } = useRouter()

  const { data: columns, isLoading } = useFetchData<
    ColumnDataType[],
    [number | undefined]
  >(getColumns, [id as number | undefined])

  if (isLoading) {
    return <div>Loading columns...</div>
  } // 시간이 있으면 스피너 만들고 싶어요

  return (
    <Layout>
      <ColumnLayout>
        {columns?.map((column: any) => <Column key={column.id} {...column} />)}
        <div className={S.addWrapper}>
          <DashboardButton type="addColumn" />
        </div>
      </ColumnLayout>
    </Layout>
  )
}

export default DashboardIdPage
