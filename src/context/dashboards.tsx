import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

import { fetchGetDashboardDetail } from '@/pages/api/dashboards'

import { usePagination } from '../hooks/usePagination'
import { ChildrenProps } from '../types/commonType'
import { DashboardType } from '../types/mydashboard'
import { PaginationContextType } from '../types/mydashboard'

interface DashboardContextType<T> extends PaginationContextType<T> {
  dashboardDetail: DashboardType | null
  setDashboardDetail: Dispatch<SetStateAction<DashboardType | null>>
}

export const DashboardsContext = createContext<
  DashboardContextType<DashboardType>
>({
  pageData: [],
  currPage: 1,
  lastPage: 1,
  onClickPrevPage: () => {},
  onClickNextPage: () => {},
  updateData: () => {},
  dashboardDetail: null,
  setDashboardDetail: () => {},
})

function DashboardsProvider({ children }: ChildrenProps) {
  const {
    query: { id },
  } = useRouter()
  const dashboardId = typeof id === 'string' ? +id : 0

  const [dashboards, setDashboards] = useState<DashboardType[]>([])
  const [dashboardDetail, setDashboardDetail] = useState<DashboardType | null>(
    null,
  )

  const getDashboardTitle = async (dashboardId: number) => {
    try {
      const dashboard = await fetchGetDashboardDetail(dashboardId)
      setDashboardDetail(dashboard)
    } catch (err) {
      console.error(err)
    }
  }

  const {
    pageData,
    currPage,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    updateData,
  } = usePagination<DashboardType>(5, 'dashboard', dashboards, setDashboards)

  useEffect(() => {
    if (dashboardId) {
      getDashboardTitle(dashboardId)
    }
  }, [id])

  return (
    <DashboardsContext.Provider
      value={{
        pageData,
        currPage,
        lastPage,
        onClickPrevPage,
        onClickNextPage,
        updateData,
        dashboardDetail,
        setDashboardDetail,
      }}
    >
      {children}
    </DashboardsContext.Provider>
  )
}

export default DashboardsProvider
