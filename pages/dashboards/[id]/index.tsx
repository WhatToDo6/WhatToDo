import { GetServerSideProps } from 'next'

import { useState, useEffect } from 'react'

import { getColumns, postColumns } from '@/pages/api/columns'
import Layout from '@/src/components/common/layout'
import Modal from '@/src/components/common/modal'
import ModalDashBoard from '@/src/components/common/modal/modal-dashboard'
import Column from '@/src/components/dashboard/column'
import ColumnLayout from '@/src/components/dashboard/column/column-layout'
import DashboardButton from '@/src/components/dashboard/dashboard-button'
import { ColumnDataType, ColumnTitleType } from '@/src/types/dashboard'

import S from './DashboardId.module.scss'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  return {
    props: {
      id,
    },
  }
}

const DashboardIdPage = ({ id }: { id: number }) => {
  const dashboardId = Number(id)
  const [columns, setColumns] = useState<ColumnDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reload, setReload] = useState(false)
  const columnList: Record<number, string> = {}
  columns.map((column) => {
    columnList[Number(column.id)] = column.title
  })

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleAPI = async (data: ColumnTitleType) => {
    for (let i in columns) {
      if (columns[i].title === data.newColumn) {
        alert('이미 존재하는 컬럼명입니다.')
        return
      }
    }
    try {
      const requestData = {
        title: data.newColumn,
      }
      if (!dashboardId) throw new Error('대시보드 ID가 제공되지 않았습니다.')
      const newColumn = await postColumns(requestData, dashboardId)
      if (newColumn) {
        setColumns((prevColumns) => [...prevColumns, newColumn])
        setIsModalOpen(false)
      }
    } catch (error) {
      alert('컬럼은 최대 10개까지 생성가능합니다.')
      console.error('컬럼 데이터를 업데이트하는 데 실패했습니다:', error)
    }
  }

  const fetchColumns = async () => {
    if (dashboardId) {
      setIsLoading(true)
      try {
        const data = await getColumns(dashboardId)
        setColumns(data)
        setReload(false)
      } catch (error) {
        console.error('Failed to fetch columns:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    fetchColumns()
  }, [dashboardId, reload])

  if (isLoading) {
    return <div>칼럼을 로딩 중입니다</div>
  }

  return (
    <Layout>
      <ColumnLayout
        columns={columns}
        setColumns={setColumns}
        dashboardId={dashboardId}
        setReload={setReload}
        columnList={columnList}
      >
        {columns.map((column) => (
          <Column key={column.id} {...column} dashboardId={dashboardId} />
        ))}
        <div className={S.addWrapper} onClick={handleClick}>
          <DashboardButton type="addColumn" />
        </div>
      </ColumnLayout>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
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
    </Layout>
  )
}

export default DashboardIdPage
