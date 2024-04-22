import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { getColumns } from '@/pages/api/columns'
import Layout from '@/src/components/common/layout'
import Column from '@/src/components/dashboard/column'
import ColumnLayout from '@/src/components/dashboard/column/column-layout'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import { ColumnDataType } from '@/src/types/dashboard.interface'

import S from './DashboardId.module.scss'

const DashboardIdPage = () => {
  const {
    query: { id },
  } = useRouter()
  const [columns, setColumns] = useState<ColumnDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        if (id) {
          const data = await getColumns(Number(id))
          setColumns(data)
        }
      } catch (error) {
        console.error('Failed to fetch columns:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchColumns()
  }, [id])

  if (isLoading) {
    return <div>칼럼을 로딩 중입니다</div>
  }

  return (
    <Layout>
      <ColumnLayout columns={columns} setColumns={setColumns}>
        {columns.map((column) => (
          <Column key={column.id} {...column} />
        ))}
        <div className={S.addWrapper}>
          <DashboardButton type="addColumn" />
        </div>
      </ColumnLayout>
    </Layout>
  )
}

export default DashboardIdPage
