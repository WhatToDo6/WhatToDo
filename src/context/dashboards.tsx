import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

import {
  fetchGetDashboardDetail,
  fetchGetDashboardList,
} from '@/pages/api/dashboards'

import { usePagination } from '../hooks/usePagination'
import { ChildrenProps } from '../types/common'
import { DashboardType } from '../types/mydashboard'
import { PaginationContextType } from '../types/mydashboard'

interface DashboardContextType<T> extends PaginationContextType<T> {
  dashboardDetail: DashboardType | null
  setDashboardDetail: Dispatch<SetStateAction<DashboardType | null>>
  sideMenuDashboards: DashboardType[]
  getSideMenuDashboards: () => Promise<void>
  editSideMenuDashboards: (dashboard: DashboardType) => void
  selectedDashboard: string
  setSelectedDashboard: Dispatch<SetStateAction<string>>
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
  sideMenuDashboards: [],
  getSideMenuDashboards: async (): Promise<void> => {},
  editSideMenuDashboards: () => {},
  selectedDashboard: '',
  setSelectedDashboard: () => {},
})

function DashboardsProvider({ children }: ChildrenProps) {
  const {
    query: { id },
    pathname,
  } = useRouter()
  const router = useRouter()
  const dashboardId = typeof id === 'string' ? +id : 0

  const [dashboards, setDashboards] = useState<DashboardType[]>([])
  const [dashboardDetail, setDashboardDetail] = useState<DashboardType | null>(
    null,
  )
  const [sideMenuDashboards, setSideMenuDashboards] = useState<DashboardType[]>(
    [],
  )
  const [selectedDashboard, setSelectedDashboard] = useState('')

  const getDashboardDetail = async (dashboardId: number) => {
    try {
      const dashboard = await fetchGetDashboardDetail(dashboardId)
      setDashboardDetail(dashboard)
    } catch (err) {
      console.error(err)
    }
  }

  //TODO: 페이지네이션으로 수정
  const getSideMenuDashboards = async () => {
    try {
      const { data: dashboards, totalCount } =
        await fetchGetDashboardList<DashboardType>(1, 15)
      setSideMenuDashboards(dashboards)
    } catch (err) {
      console.error(err)
    }
  }

  const editSideMenuDashboards = (dashboard: DashboardType) => {
    const id = dashboard.id
    let newState: DashboardType[]
    newState = sideMenuDashboards.map((el) => {
      if (el.id === id) return (el = dashboard)
      return el
    })
    setSideMenuDashboards(newState)
  }

  const {
    pageData,
    currPage,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    updateData,
  } = usePagination<DashboardType>(
    5,
    'dashboard',
    dashboards,
    setDashboards,
    dashboardId,
  )

  useEffect(() => {
    if (dashboardId) {
      getDashboardDetail(dashboardId)
    }
  }, [id])

  useEffect(() => {
    getSideMenuDashboards()
  }, [])

  useEffect(() => {
    if (pathname === '/dashboards/[id]/edit' && dashboardDetail) {
      if (!dashboardDetail.createdByMe) router.push('/404')
    }
  }, [dashboardDetail])

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
        sideMenuDashboards,
        getSideMenuDashboards,
        editSideMenuDashboards,
        selectedDashboard,
        setSelectedDashboard,
      }}
    >
      {children}
    </DashboardsContext.Provider>
  )
}

export default DashboardsProvider
