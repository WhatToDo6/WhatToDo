import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { getColumns, postColumns } from '@/pages/api/columns'
import Layout from '@/src/components/common/layout'
import Modal from '@/src/components/common/modal'
import ModalDashBoard from '@/src/components/common/modal/modal-dashboard'
import Column from '@/src/components/dashboard/column'
import ColumnLayout from '@/src/components/dashboard/column/column-layout'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import {
  ColumnDataType,
  ColumnTitleType,
} from '@/src/types/dashboard.interface'

import S from './DashboardId.module.scss'

const DashboardIdPage = () => {
  const {
    query: { id },
  } = useRouter()
  const [columns, setColumns] = useState<ColumnDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleAPI = async (data: ColumnTitleType) => {
    try {
      const requestData = {
        title: data.newColumn,
      }
      if (!id) throw new Error('대시보드 ID가 제공되지 않았습니다.')
      const newColumn = await postColumns(requestData, Number(id))
      if (newColumn) {
        setColumns((prevColumns) => [...prevColumns, newColumn])
        setIsModalOpen(false)
      }
    } catch (error) {
      alert('컬럼은 최대 10개까지 생성가능합니다.')
      console.error('컬럼 데이터를 업데이트하는 데 실패했습니다:', error)
    }
  }

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
          <Column key={column.id} {...column} dashboardId={Number(id)} />
        ))}
        <div className={S.addWrapper} onClick={handleClick}>
          <DashboardButton type="addColumn" />
        </div>
        {isModalOpen && (
          <Modal setIsOpen={setIsModalOpen}>
            <ModalDashBoard
              title="새 칼럼 생성"
              inputTitle="이름"
              inputType="newColumn"
              placeholder="새로운 프로젝트"
              leftButtonText="취소"
              rightButtonText="생성"
              currentColumn=""
              onSubmit={handleAPI}
            />
          </Modal>
        )}
      </ColumnLayout>
    </Layout>
  )
}

export default DashboardIdPage
